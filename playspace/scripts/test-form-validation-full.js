/**
 * PlaySpace - Full Form Validation & Security Test Suite
 * 
 * Verifies all criteria from the user prompt:
 * 1. Valid name (letters only, uppercase, lowercase, spaces between names)
 * 2. Invalid name with numbers (e.g. Ranjith123, 12345)
 * 3. Invalid name with special characters (e.g. Ranjith@123)
 * 4. Valid mobile number (exactly 10 digits)
 * 5. Invalid mobile number with alphabets or wrong length (e.g. 98765abc10, 12345)
 * 6. Valid email (ranjith@gmail.com, user@example.com)
 * 7. Email without @ (ranjithgmail.com)
 * 8. Email without domain (ranjith@, ranjith@gmail, @gmail.com)
 * 9. Empty required fields
 * 10. Valid form submission & backend schema validation
 * 11. Invalid form submission blocked from saving to database/localStorage
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const validator = require('../assets/js/validation');

console.log('====================================================');
console.log('RUNNING STRICT FORM INPUT & BACKEND VALIDATION TESTS');
console.log('====================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: Name Field Validation
// -----------------------------------------------------------------------------
console.log('--- TEST 1: Name Field Validation ---');
const validNames = ['Ranjith', 'Ranjith Kumar', 'Sri Devi', 'Leo Jenkins', 'Sarah'];
validNames.forEach(name => {
  const res = validator.validateName(name);
  assert.strictEqual(res.valid, true, `Expected valid name for "${name}"`);
  console.log(`  ✓ Valid name accepted: "${name}"`);
});

const invalidNames = [
  { val: 'Ranjith123', reason: 'Contains numbers' },
  { val: '12345', reason: 'Digits only' },
  { val: 'Ranjith@123', reason: 'Contains symbols and numbers' },
  { val: 'Sarah!', reason: 'Contains exclamation mark' },
  { val: '   ', reason: 'Empty / whitespace' },
  { val: 'A', reason: 'Too short (< 2 chars)' }
];
invalidNames.forEach(({ val, reason }) => {
  const res = validator.validateName(val);
  assert.strictEqual(res.valid, false, `Expected invalid name for "${val}" (${reason})`);
  console.log(`  ✓ Invalid name rejected: "${val}" -> Reason: ${res.message}`);
});

// -----------------------------------------------------------------------------
// TEST 2: Number / Mobile Field Validation
// -----------------------------------------------------------------------------
console.log('\n--- TEST 2: Mobile / Phone Number Field Validation ---');
const validMobiles = ['9876543210', '9123456780', '8887776665'];
validMobiles.forEach(mob => {
  const res = validator.validateMobile(mob);
  assert.strictEqual(res.valid, true, `Expected valid mobile for "${mob}"`);
  console.log(`  ✓ Valid mobile accepted: "${mob}"`);
});

const invalidMobiles = [
  { val: '98765abc10', reason: 'Contains alphabets' },
  { val: '12345', reason: 'Less than 10 digits' },
  { val: '98765432109', reason: 'More than 10 digits' },
  { val: '98765@#210', reason: 'Contains special characters' },
  { val: '', reason: 'Empty string' }
];
invalidMobiles.forEach(({ val, reason }) => {
  const res = validator.validateMobile(val);
  assert.strictEqual(res.valid, false, `Expected invalid mobile for "${val}" (${reason})`);
  console.log(`  ✓ Invalid mobile rejected: "${val}" -> Reason: ${res.message}`);
});

// -----------------------------------------------------------------------------
// TEST 3: Email Field Validation
// -----------------------------------------------------------------------------
console.log('\n--- TEST 3: Email Field Validation ---');
const validEmails = ['ranjith@gmail.com', 'user@example.com', 'sarah.jenkins@playspace.org'];
validEmails.forEach(email => {
  const res = validator.validateEmail(email);
  assert.strictEqual(res.valid, true, `Expected valid email for "${email}"`);
  console.log(`  ✓ Valid email accepted: "${email}"`);
});

const invalidEmails = [
  { val: 'ranjithgmail.com', reason: 'Missing @ symbol' },
  { val: 'ranjith@', reason: 'Missing domain after @' },
  { val: '@gmail.com', reason: 'Missing username before @' },
  { val: 'ranjith@gmail', reason: 'Missing top level domain (.com)' },
  { val: 'ranjith@.com', reason: 'Empty domain name' },
  { val: '', reason: 'Empty email' }
];
invalidEmails.forEach(({ val, reason }) => {
  const res = validator.validateEmail(val);
  assert.strictEqual(res.valid, false, `Expected invalid email for "${val}" (${reason})`);
  console.log(`  ✓ Invalid email rejected: "${val}" -> Reason: ${res.message}`);
});

// -----------------------------------------------------------------------------
// TEST 4: Number / Quantity / Age Fields
// -----------------------------------------------------------------------------
console.log('\n--- TEST 4: Quantity & Age Field Validation ---');
assert.strictEqual(validator.validateNumber('7', 1, 17, 'Child Age').valid, true);
assert.strictEqual(validator.validateNumber('abc', 1, 17, 'Child Age').valid, false);
assert.strictEqual(validator.validateNumber('0', 1, 17, 'Child Age').valid, false);
assert.strictEqual(validator.validateNumber('18', 1, 17, 'Child Age').valid, false);
console.log('  ✓ Child age numbers-only range check passed (1-17)');

assert.strictEqual(validator.validateNumber('2', 1, 20, 'Jumpers').valid, true);
assert.strictEqual(validator.validateNumber('0', 1, 20, 'Jumpers').valid, false);
console.log('  ✓ Jumpers quantity check passed (1-20)');

// -----------------------------------------------------------------------------
// TEST 5: Required Fields Validation
// -----------------------------------------------------------------------------
console.log('\n--- TEST 5: Required Field Validation ---');
assert.strictEqual(validator.validateRequired('Oct 17, 2026').valid, true);
assert.strictEqual(validator.validateRequired('').valid, false);
assert.strictEqual(validator.validateRequired('   ').valid, false);
assert.strictEqual(validator.validateRequired(true).valid, true);
assert.strictEqual(validator.validateRequired(false).valid, false);
console.log('  ✓ Required fields empty validation passed');

// -----------------------------------------------------------------------------
// TEST 6: Backend / Security Schema Validation & Persistence Gatekeeper
// -----------------------------------------------------------------------------
console.log('\n--- TEST 6: Backend / Database Security Validation ---');

const bookingSchema = {
  parentName: { type: 'name', required: true, label: 'Parent Name' },
  email: { type: 'email', required: true, label: 'Email Address' },
  phone: { type: 'mobile', required: true, label: 'Phone Number' },
  startDate: { type: 'text', required: true, label: 'Start Date' },
  jumpers: { type: 'number', required: true, min: 1, max: 20, label: 'Jumpers Count' }
};

// Valid submission payload
const validPayload = {
  parentName: 'Ranjith Kumar',
  email: 'ranjith@gmail.com',
  phone: '9876543210',
  startDate: '2026-10-17',
  jumpers: 2
};
const validResult = validator.validateRecord(validPayload, bookingSchema);
assert.strictEqual(validResult.valid, true, 'Valid payload must pass backend validation');
console.log('  ✓ Valid booking payload passed backend schema check');

// Invalid submission payload 1: Name contains numbers
const invalidNamePayload = { ...validPayload, parentName: 'Ranjith123' };
const res1 = validator.validateRecord(invalidNamePayload, bookingSchema);
assert.strictEqual(res1.valid, false, 'Payload with invalid name must fail');
assert.ok(res1.errors.some(e => e.includes('letters only')), 'Should report letters only error');
console.log('  ✓ Invalid name in payload successfully blocked:', res1.errors[0]);

// Invalid submission payload 2: Mobile contains alphabets
const invalidMobilePayload = { ...validPayload, phone: '98765abc10' };
const res2 = validator.validateRecord(invalidMobilePayload, bookingSchema);
assert.strictEqual(res2.valid, false, 'Payload with invalid mobile must fail');
assert.ok(res2.errors.some(e => e.includes('numbers only') || e.includes('10 digits')), 'Should report phone error');
console.log('  ✓ Invalid mobile in payload successfully blocked:', res2.errors[0]);

// Invalid submission payload 3: Email without @
const invalidEmailNoAt = { ...validPayload, email: 'ranjithgmail.com' };
const res3 = validator.validateRecord(invalidEmailNoAt, bookingSchema);
assert.strictEqual(res3.valid, false, 'Payload with email without @ must fail');
console.log('  ✓ Email without @ in payload successfully blocked:', res3.errors[0]);

// Invalid submission payload 4: Email without domain
const invalidEmailNoDomain = { ...validPayload, email: 'ranjith@' };
const res4 = validator.validateRecord(invalidEmailNoDomain, bookingSchema);
assert.strictEqual(res4.valid, false, 'Payload with email without domain must fail');
console.log('  ✓ Email without domain in payload successfully blocked:', res4.errors[0]);

// Invalid submission payload 5: Empty required fields
const emptyRequiredPayload = { ...validPayload, startDate: '' };
const res5 = validator.validateRecord(emptyRequiredPayload, bookingSchema);
assert.strictEqual(res5.valid, false, 'Payload with empty required date must fail');
console.log('  ✓ Empty required field in payload successfully blocked:', res5.errors[0]);

// -----------------------------------------------------------------------------
// TEST 7: Mock Storage Rejection Test
// -----------------------------------------------------------------------------
console.log('\n--- TEST 7: Mock Database Storage Gatekeeper ---');
const mockStorage = {};
global.localStorage = {
  getItem: key => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = val; }
};

// Saving valid record
try {
  validator.saveToStorage('playspace_pass_bookings', validPayload, bookingSchema);
  assert.ok(mockStorage['playspace_pass_bookings'], 'Valid record should be stored');
  console.log('  ✓ Valid record safely persisted to database/storage');
} catch (e) {
  assert.fail('Valid record should not throw: ' + e.message);
}

// Attempting to save invalid record
let blocked = false;
try {
  validator.saveToStorage('playspace_pass_bookings', invalidNamePayload, bookingSchema);
} catch (err) {
  blocked = true;
  console.log('  ✓ Malicious/invalid payload blocked from database storage: ' + err.message);
}
assert.strictEqual(blocked, true, 'Invalid record must throw and be rejected by saveToStorage');

// -----------------------------------------------------------------------------
// TEST 8: Verify Form HTML Files Across Project
// -----------------------------------------------------------------------------
console.log('\n--- TEST 8: HTML Files Static Compliance Audit ---');
const pagesDir = path.join(__dirname, '..', 'pages');
const parentDir = path.join(__dirname, '..', 'parent');

const auditedFiles = [
  path.join(pagesDir, 'pass-booking.html'),
  path.join(pagesDir, 'birthday-booking.html'),
  path.join(pagesDir, 'booking.html'),
  path.join(pagesDir, 'booking-mega-trampoline-arena.html'),
  path.join(pagesDir, 'contact.html'),
  path.join(pagesDir, 'login.html'),
  path.join(pagesDir, 'register.html'),
  path.join(pagesDir, 'forgot-password.html'),
  path.join(parentDir, 'profile.html'),
  path.join(parentDir, 'children.html')
];

auditedFiles.forEach(file => {
  assert.ok(fs.existsSync(file), `File must exist: ${file}`);
  const content = fs.readFileSync(file, 'utf8');
  assert.ok(content.includes('validation.js'), `Must load validation.js: ${path.basename(file)}`);
  console.log(`  ✓ ${path.basename(file)} loaded with validation engine`);
});

console.log('\n====================================================');
console.log('ALL FORM VALIDATION & SECURITY TESTS PASSED (100%)');
console.log('====================================================\n');
