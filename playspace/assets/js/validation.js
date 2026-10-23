/**
 * PlaySpace - Unified Form & Security Validation Engine
 * 
 * Strict field validation meeting all user specifications:
 * 1. Name Fields: Letters only (uppercase, lowercase, spaces between words).
 *    No numbers. No special characters.
 * 2. Number Fields: Digits only (no alphabets, no symbols).
 *    Mobile numbers must contain exactly 10 digits.
 * 3. Email Fields: Valid email format requiring '@' and a valid domain after '@'.
 * 4. Required Fields: Clear error messages when empty, prevent submission until valid.
 * 5. Validation UX: Clear error message below input, immediate removal once corrected,
 *    real-time character blocking where applicable.
 * 6. Security / Backend Validation: Validates records before persisting to localStorage
 *    or submitting to database/API. Invalid payloads are rejected.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PlaySpaceValidation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Strict Regular Expressions
  const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const MOBILE_REGEX = /^[0-9]{10}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const DIGITS_ONLY_REGEX = /^\d+$/;

  /**
   * 1. Name Field Validation
   * Letters only (uppercase & lowercase), single spaces between words.
   * No numbers, no special characters.
   */
  function validateName(val, fieldLabel) {
    const label = fieldLabel || 'Name';
    if (typeof val !== 'string') {
      return { valid: false, message: `${label} is required.` };
    }
    const trimmed = val.trim();
    if (!trimmed) {
      return { valid: false, message: `${label} is required and cannot be empty.` };
    }
    if (trimmed.length < 2) {
      return { valid: false, message: `${label} must contain at least 2 letters.` };
    }
    if (/\d/.test(trimmed)) {
      return { valid: false, message: `${label} must contain letters only (numbers are not allowed).` };
    }
    if (/[^A-Za-z\s]/.test(trimmed)) {
      return { valid: false, message: `${label} must contain letters only (special characters are not allowed).` };
    }
    if (!NAME_REGEX.test(trimmed)) {
      return { valid: false, message: `${label} must contain valid letters and single spaces between names.` };
    }
    return { valid: true, sanitized: trimmed };
  }

  /**
   * 2. Mobile / Phone Number Validation
   * Exactly 10 digits. Numbers only.
   */
  function validateMobile(val, fieldLabel) {
    const label = fieldLabel || 'Mobile number';
    if (typeof val !== 'string' && typeof val !== 'number') {
      return { valid: false, message: `${label} is required.` };
    }
    const str = String(val).trim();
    if (!str) {
      return { valid: false, message: `${label} is required and cannot be empty.` };
    }
    // Check if alphabets or symbols were typed
    if (/[A-Za-z]/.test(str)) {
      return { valid: false, message: `${label} must contain numbers only (alphabets are not allowed).` };
    }
    const digits = str.replace(/\D/g, '');
    if (digits.length !== 10) {
      return { valid: false, message: `${label} must contain exactly 10 digits.` };
    }
    if (!MOBILE_REGEX.test(digits)) {
      return { valid: false, message: `${label} must contain 10 numbers only.` };
    }
    return { valid: true, sanitized: digits };
  }

  /**
   * 2b. Numeric / Quantity / Age Validation
   * Numbers only. Within optional min/max bounds.
   */
  function validateNumber(val, min, max, fieldLabel) {
    const label = fieldLabel || 'Number';
    if (val === '' || val === null || val === undefined) {
      return { valid: false, message: `${label} is required.` };
    }
    const str = String(val).trim();
    if (!DIGITS_ONLY_REGEX.test(str)) {
      return { valid: false, message: `${label} must contain numbers only.` };
    }
    const num = parseInt(str, 10);
    if (typeof min === 'number' && num < min) {
      return { valid: false, message: `${label} must be at least ${min}.` };
    }
    if (typeof max === 'number' && num > max) {
      return { valid: false, message: `${label} cannot exceed ${max}.` };
    }
    return { valid: true, sanitized: num };
  }

  /**
   * 3. Email Field Validation
   * Valid format: '@' symbol mandatory and valid domain after '@'.
   */
  function validateEmail(val, fieldLabel) {
    const label = fieldLabel || 'Email address';
    if (typeof val !== 'string') {
      return { valid: false, message: `${label} is required.` };
    }
    const trimmed = val.trim();
    if (!trimmed) {
      return { valid: false, message: `${label} is required and cannot be empty.` };
    }
    if (!trimmed.includes('@')) {
      return { valid: false, message: `${label} must include an '@' symbol.` };
    }
    const parts = trimmed.split('@');
    if (!parts[0]) {
      return { valid: false, message: `${label} must have a name before the '@' symbol.` };
    }
    if (parts.length > 2) {
      return { valid: false, message: `${label} cannot contain multiple '@' symbols.` };
    }
    const domain = parts[1];
    if (!domain || !domain.includes('.')) {
      return { valid: false, message: `${label} must include a valid domain after '@' (e.g. gmail.com).` };
    }
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) {
      return { valid: false, message: `${label} domain ending is invalid.` };
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      return { valid: false, message: `Please enter a valid ${label.toLowerCase()} (e.g. user@example.com).` };
    }
    return { valid: true, sanitized: trimmed.toLowerCase() };
  }

  /**
   * 4. Required Field Validation
   */
  function validateRequired(val, fieldLabel) {
    const label = fieldLabel || 'This field';
    if (val === null || val === undefined) {
      return { valid: false, message: `${label} is required.` };
    }
    if (typeof val === 'boolean') {
      return val ? { valid: true } : { valid: false, message: `${label} is required.` };
    }
    if (typeof val === 'string' && val.trim() === '') {
      return { valid: false, message: `${label} is required and cannot be empty.` };
    }
    return { valid: true };
  }

  /**
   * DOM Helper: Resolve Field Type
   */
  function resolveFieldType(input) {
    if (!input) return 'text';
    const dataType = (input.getAttribute('data-type') || '').toLowerCase();
    if (dataType) {
      if (dataType === 'age' || dataType === 'quantity' || dataType === 'jumpers' || dataType === 'count') {
        return 'number';
      }
      return dataType;
    }

    const type = (input.type || '').toLowerCase();
    const id = (input.id || '').toLowerCase();
    const name = (input.name || '').toLowerCase();
    const placeholder = (input.placeholder || '').toLowerCase();

    if (type === 'email' || id.includes('email') || name.includes('email')) {
      return 'email';
    }
    if (type === 'tel' || id.includes('phone') || id.includes('mobile') || name.includes('phone') || name.includes('mobile')) {
      return 'mobile';
    }
    if (
      id.includes('parentname') || id.includes('childname') || id.includes('contactname') ||
      name.includes('parentname') || name.includes('childname') || name.includes('contactname') ||
      id.includes('fullname') || name.includes('fullname') ||
      (type === 'text' && (placeholder.includes('sarah jenkins') || placeholder.includes('full name') || id.endsWith('name') || name.endsWith('name')))
    ) {
      return 'name';
    }
    if (type === 'number' || id.includes('jumpers') || id.includes('kids') || id.includes('children') || id.includes('age') || name.includes('age')) {
      return 'number';
    }
    if (type === 'checkbox') {
      return 'checkbox';
    }
    return type || 'text';
  }

  /**
   * DOM Helper: Get Field Friendly Label
   */
  function getFieldLabel(input) {
    if (!input) return 'Field';
    const formGroup = input.closest('.ps-form-group') || input.parentElement;
    if (formGroup) {
      const labelEl = formGroup.querySelector('label, .ps-label, .ps-form-label');
      if (labelEl) {
        // Strip asterisks and trailing colons
        return labelEl.textContent.replace(/[*:]/g, '').trim() || 'Field';
      }
    }
    if (input.placeholder) {
      return input.placeholder.split('(')[0].replace(/^e\.g\. /i, '').trim() || 'Field';
    }
    return input.name || input.id || 'Field';
  }

  /**
   * DOM Helper: Find or Create Error Message Node
   */
  function getOrCreateErrorElement(input) {
    if (typeof document === 'undefined' || !input) return null;
    const formGroup = input.closest('.ps-form-group') || input.parentElement;

    // Check for existing error element
    let errorEl = null;
    if (formGroup) {
      errorEl = formGroup.querySelector('.ps-form-error, .ps-field-error, .ps-form-hint[style*="e74c3c"]');
    }
    if (!errorEl && input.nextElementSibling && (
      input.nextElementSibling.classList.contains('ps-form-error') ||
      input.nextElementSibling.classList.contains('ps-field-error')
    )) {
      errorEl = input.nextElementSibling;
    }

    if (!errorEl && formGroup) {
      errorEl = document.createElement('div');
      errorEl.className = 'ps-form-error';
      errorEl.setAttribute('role', 'alert');
      errorEl.style.display = 'none';

      // Insert right after input if direct child, otherwise append to group
      if (input.parentNode === formGroup && input.nextSibling) {
        formGroup.insertBefore(errorEl, input.nextSibling);
      } else {
        formGroup.appendChild(errorEl);
      }
    }

    return errorEl;
  }

  /**
   * DOM UX: Show field error
   */
  function showFieldError(input, message) {
    if (!input) return;
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');

    const errorEl = getOrCreateErrorElement(input);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  /**
   * DOM UX: Clear field error
   */
  function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');

    const formGroup = input.closest('.ps-form-group') || input.parentElement;
    let errorEl = null;
    if (formGroup) {
      errorEl = formGroup.querySelector('.ps-form-error, .ps-field-error, .ps-form-hint[style*="e74c3c"]');
    }
    if (!errorEl && input.nextElementSibling && (
      input.nextElementSibling.classList.contains('ps-form-error') ||
      input.nextElementSibling.classList.contains('ps-field-error')
    )) {
      errorEl = input.nextElementSibling;
    }

    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  /**
   * Validate a single DOM input element
   */
  function validateField(input) {
    if (!input) return true;
    const fieldType = resolveFieldType(input);
    const label = getFieldLabel(input);
    const isRequired = input.hasAttribute('required') || input.getAttribute('data-required') === 'true';
    const value = input.value !== undefined ? input.value : '';

    // Checkbox handling
    if (input.type === 'checkbox') {
      if (isRequired && !input.checked) {
        showFieldError(input, `${label} is required.`);
        return false;
      }
      clearFieldError(input);
      return true;
    }

    const trimmed = String(value).trim();

    // Empty check
    if (!trimmed) {
      if (isRequired) {
        showFieldError(input, `${label} is required.`);
        return false;
      }
      clearFieldError(input);
      return true;
    }

    // Type specific checks
    let result = { valid: true };
    if (fieldType === 'name') {
      result = validateName(trimmed, label);
    } else if (fieldType === 'mobile') {
      result = validateMobile(trimmed, label);
    } else if (fieldType === 'email') {
      result = validateEmail(trimmed, label);
    } else if (fieldType === 'number') {
      const min = input.hasAttribute('min') ? parseInt(input.getAttribute('min'), 10) : undefined;
      const max = input.hasAttribute('max') ? parseInt(input.getAttribute('max'), 10) : undefined;
      result = validateNumber(trimmed, min, max, label);
    } else if (isRequired) {
      result = validateRequired(trimmed, label);
    }

    if (!result.valid) {
      showFieldError(input, result.message);
      return false;
    }

    clearFieldError(input);
    return true;
  }

  /**
   * Validate an entire DOM form
   */
  function validateForm(formEl) {
    if (!formEl) return true;
    let isFormValid = true;
    let firstInvalid = null;

    const inputs = formEl.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea');
    inputs.forEach(input => {
      const ok = validateField(input);
      if (!ok) {
        isFormValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (!isFormValid && firstInvalid) {
      firstInvalid.focus();
    }

    return isFormValid;
  }

  /**
   * Real-time character interceptor for inputs
   */
  function attachRealtimeInterceptors(input) {
    if (!input || input._psAttached) return;
    input._psAttached = true;

    const fieldType = resolveFieldType(input);

    // 1. Name fields: allow letters and single space only
    if (fieldType === 'name') {
      input.addEventListener('input', function () {
        const original = this.value;
        const cleaned = original.replace(/[^A-Za-z\s]/g, '').replace(/\s{2,}/g, ' ');
        if (original !== cleaned) {
          this.value = cleaned;
        }
        validateField(this);
      });
      input.addEventListener('blur', function () {
        this.value = this.value.trim();
        validateField(this);
      });
    }

    // 2. Mobile / Phone fields: digits only, maximum 10 digits
    else if (fieldType === 'mobile') {
      input.addEventListener('input', function () {
        const original = this.value;
        const cleaned = original.replace(/\D/g, '').slice(0, 10);
        if (original !== cleaned) {
          this.value = cleaned;
        }
        validateField(this);
      });
      input.addEventListener('blur', function () {
        validateField(this);
      });
    }

    // 3. Number / Age / Quantity fields: digits only
    else if (fieldType === 'number') {
      input.addEventListener('input', function () {
        const original = this.value;
        const cleaned = original.replace(/\D/g, '');
        if (original !== cleaned) {
          this.value = cleaned;
        }
        validateField(this);
      });
      input.addEventListener('blur', function () {
        validateField(this);
      });
    }

    // 4. Email fields: validate on input/change/blur
    else if (fieldType === 'email') {
      input.addEventListener('input', function () {
        // As soon as valid email is entered, remove error
        if (EMAIL_REGEX.test(this.value.trim())) {
          clearFieldError(this);
        }
      });
      input.addEventListener('blur', function () {
        validateField(this);
      });
    }

    // 5. Generic required fields
    else {
      input.addEventListener('input', function () {
        if (this.value.trim()) {
          clearFieldError(this);
        }
      });
      input.addEventListener('blur', function () {
        validateField(this);
      });
    }
  }

  /**
   * 6. Backend / Database Security Gatekeeper
   * Validates a data record against a strict schema before saving to database or localStorage.
   */
  function validateRecord(record, schema) {
    if (!record || typeof record !== 'object') {
      return { valid: false, errors: ['Record must be a valid object.'] };
    }
    const errors = [];
    const sanitized = {};

    for (const [field, rule] of Object.entries(schema)) {
      const val = record[field];
      const isRequired = !!rule.required;
      const type = rule.type || 'text';
      const label = rule.label || field;

      if (isRequired && (val === undefined || val === null || String(val).trim() === '')) {
        errors.push(`${label} is required.`);
        continue;
      }

      if (val !== undefined && val !== null && String(val).trim() !== '') {
        const strVal = String(val).trim();
        if (type === 'name') {
          const res = validateName(strVal, label);
          if (!res.valid) errors.push(res.message);
          else sanitized[field] = res.sanitized;
        } else if (type === 'mobile' || type === 'phone') {
          const res = validateMobile(strVal, label);
          if (!res.valid) errors.push(res.message);
          else sanitized[field] = res.sanitized;
        } else if (type === 'email') {
          const res = validateEmail(strVal, label);
          if (!res.valid) errors.push(res.message);
          else sanitized[field] = res.sanitized;
        } else if (type === 'number') {
          const res = validateNumber(strVal, rule.min, rule.max, label);
          if (!res.valid) errors.push(res.message);
          else sanitized[field] = res.sanitized;
        } else {
          sanitized[field] = strVal;
        }
      } else {
        sanitized[field] = val;
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors,
      sanitized: errors.length === 0 ? Object.assign({}, record, sanitized) : null
    };
  }

  /**
   * Secure Storage Saver: Rejects invalid payloads before persisting
   */
  function saveToStorage(storageKey, record, schema) {
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage is not available in this environment.');
    }
    if (schema) {
      const check = validateRecord(record, schema);
      if (!check.valid) {
        throw new Error('Security Validation Failed: ' + check.errors.join('; '));
      }
      record = check.sanitized || record;
    }

    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(existing)) existing = [];
    } catch (e) {
      existing = [];
    }

    existing.unshift(record);
    localStorage.setItem(storageKey, JSON.stringify(existing));
    try {
      localStorage.setItem('playspace_last_booking', JSON.stringify(record));
    } catch (e) {}

    return record;
  }

  /**
   * Initialize all forms on page
   */
  function init() {
    if (typeof document === 'undefined') return;

    // Attach real-time character blockers & listeners to all inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(attachRealtimeInterceptors);

    // Global form submit interceptor for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (form._psFormBound) return;
      form._psFormBound = true;

      form.addEventListener('submit', function (e) {
        const isValid = validateForm(this);
        if (!isValid) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof window !== 'undefined' && window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
            window.PlaySpaceComponents.showToast('Please correct the errors in the form before submitting.');
          }
          return false;
        }
      }, true); // Use capture phase so invalid data is blocked before other submit listeners
    });
  }

  // Auto-init in browser when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  // Public API
  return {
    validateName: validateName,
    validateMobile: validateMobile,
    validatePhone: validateMobile, // alias
    validateEmail: validateEmail,
    validateNumber: validateNumber,
    validateRequired: validateRequired,
    validateField: validateField,
    validateForm: validateForm,
    validateRecord: validateRecord,
    saveToStorage: saveToStorage,
    attachRealtimeInterceptors: attachRealtimeInterceptors,
    init: init,
    REGEX: {
      NAME: NAME_REGEX,
      MOBILE: MOBILE_REGEX,
      EMAIL: EMAIL_REGEX,
      DIGITS: DIGITS_ONLY_REGEX
    }
  };
});
