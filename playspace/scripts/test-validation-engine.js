/**
 * Test Suite for PlaySpace Unified Form Validation Engine
 */
const validator = require('../assets/js/validation');
const assert = require('assert');

console.log('--- Testing Name Field Validation ---');
// 1. Name Fields: Letters only (uppercase & lowercase), single spaces between names.
// Valid: Ranjith, Ranjith Kumar, Sri Devi
assert.strictEqual(validator.validateName('Ranjith').valid, true, 'Ranjith should be valid');
assert.strictEqual(validator.validateName('Ranjith Kumar').valid, true, 'Ranjith Kumar should be valid');
assert.strictEqual(validator.validateName('Sri Devi').valid, true, 'Sri Devi should be valid');

// Invalid: Ranjith123, 12345, Ranjith@123, empty
assert.strictEqual(validator.validateName('Ranjith123').valid, false, 'Ranjith123 must be invalid');
assert.strictEqual(validator.validateName('12345').valid, false, '12345 must be invalid');
assert.strictEqual(validator.validateName('Ranjith@123').valid, false, 'Ranjith@123 must be invalid');
assert.strictEqual(validator.validateName('   ').valid, false, 'Empty name must be invalid');
console.log('✓ Name validation tests passed!');

console.log('\n--- Testing Mobile / Phone Field Validation ---');
// 2. Mobile / Phone Fields: Exactly 10 digits, numbers only.
// Valid: 9876543210
assert.strictEqual(validator.validateMobile('9876543210').valid, true, '9876543210 should be valid');

// Invalid: 98765abc10, 12345, 98765432109, empty
assert.strictEqual(validator.validateMobile('98765abc10').valid, false, '98765abc10 must be invalid');
assert.strictEqual(validator.validateMobile('12345').valid, false, '12345 must be invalid');
assert.strictEqual(validator.validateMobile('98765432109').valid, false, '11 digits must be invalid');
assert.strictEqual(validator.validateMobile('').valid, false, 'Empty mobile must be invalid');
console.log('✓ Mobile validation tests passed!');

console.log('\n--- Testing Email Field Validation ---');
// 3. Email Fields: Valid format requiring @ and domain after @.
// Valid: ranjith@gmail.com, user@example.com
assert.strictEqual(validator.validateEmail('ranjith@gmail.com').valid, true, 'ranjith@gmail.com should be valid');
assert.strictEqual(validator.validateEmail('user@example.com').valid, true, 'user@example.com should be valid');

// Invalid: ranjithgmail.com, ranjith@, @gmail.com, ranjith@gmail
assert.strictEqual(validator.validateEmail('ranjithgmail.com').valid, false, 'ranjithgmail.com must be invalid (no @)');
assert.strictEqual(validator.validateEmail('ranjith@').valid, false, 'ranjith@ must be invalid (no domain)');
assert.strictEqual(validator.validateEmail('@gmail.com').valid, false, '@gmail.com must be invalid (no username)');
assert.strictEqual(validator.validateEmail('ranjith@gmail').valid, false, 'ranjith@gmail must be invalid (no top-level domain)');
assert.strictEqual(validator.validateEmail('').valid, false, 'Empty email must be invalid');
console.log('✓ Email validation tests passed!');

console.log('\n--- Testing Number / Quantity / Age Validation ---');
// Number fields
assert.strictEqual(validator.validateNumber('5', 1, 10).valid, true, '5 within 1-10 should be valid');
assert.strictEqual(validator.validateNumber('abc', 1, 10).valid, false, 'abc must be invalid for number');
assert.strictEqual(validator.validateNumber('0', 1, 10).valid, false, '0 less than min 1 must be invalid');
assert.strictEqual(validator.validateNumber('15', 1, 10).valid, false, '15 greater than max 10 must be invalid');
console.log('✓ Number validation tests passed!');

console.log('\n--- Testing Backend / Security Schema Validation ---');
// 6. Security Schema Validation
const bookingSchema = {
  parentName: { type: 'name', required: true, label: 'Parent Name' },
  email: { type: 'email', required: true, label: 'Email Address' },
  phone: { type: 'mobile', required: true, label: 'Mobile Number' },
  jumpers: { type: 'number', required: true, min: 1, max: 20, label: 'Jumpers' }
};

const validRecord = {
  parentName: 'Ranjith Kumar',
  email: 'ranjith@gmail.com',
  phone: '9876543210',
  jumpers: 2
};

const invalidRecord = {
  parentName: 'Ranjith123',
  email: 'ranjithgmail.com',
  phone: '98765abc10',
  jumpers: 'notanumber'
};

const validCheck = validator.validateRecord(validRecord, bookingSchema);
assert.strictEqual(validCheck.valid, true, 'Valid record should pass schema validation');

const invalidCheck = validator.validateRecord(invalidRecord, bookingSchema);
assert.strictEqual(invalidCheck.valid, false, 'Invalid record must fail schema validation');
assert.strictEqual(invalidCheck.errors.length, 4, 'All 4 fields should report errors');
console.log('Errors caught for invalid record:', invalidCheck.errors);
console.log('✓ Backend security validation tests passed successfully!');
