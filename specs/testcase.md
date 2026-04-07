# Student Registration Form Field Validation

## Application Overview

This plan covers validation of all input fields in the Student Registration Form, including positive, negative, and boundary scenarios.

## Test Scenarios

### 1. Field Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Validate Required Fields

**File:** `specs/testcase.md`

**Steps:**
  1. Open the registration form.
  2. Attempt to submit the form without entering any data.

**Expected Results:**
  - Validation errors are shown for all required fields (First Name, Last Name, Gender, Mobile Number).

#### 1.2. First Name Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Enter valid alphabetic characters in "First Name".
  2. Enter numeric and special characters.
  3. Leave the field blank and submit.

**Expected Results:**
  - Accepts only alphabetic input.
  - Shows error for invalid or empty input.

#### 1.3. Last Name Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Enter valid alphabetic characters in "Last Name".
  2. Enter numeric and special characters.
  3. Leave the field blank and submit.

**Expected Results:**
  - Accepts only alphabetic input.
  - Shows error for invalid or empty input.

#### 1.4. Email Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Enter a valid email address.
  2. Enter an invalid email (missing '@', domain, etc.).
  3. Leave the field blank and submit.

**Expected Results:**
  - Accepts valid email format.
  - Shows error for invalid or empty input.

#### 1.5. Gender Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Select each gender option (Male, Female, Other).
  2. Attempt to submit without selecting any option.

**Expected Results:**
  - Only one option can be selected.
  - Shows error if not selected.

#### 1.6. Mobile Number Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Enter a valid 10-digit number.
  2. Enter less than or more than 10 digits.
  3. Enter alphabetic or special characters.
  4. Leave the field blank and submit.

**Expected Results:**
  - Accepts only 10-digit numbers.
  - Shows error for invalid or empty input.

#### 1.7. Date of Birth Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Select a valid date.
  2. Enter an invalid date format.
  3. Leave the field blank and submit.

**Expected Results:**
  - Accepts valid date.
  - Shows error for invalid or empty input.

#### 1.8. Subjects Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Enter a valid subject.
  2. Enter random text.
  3. Leave the field blank and submit.

**Expected Results:**
  - Accepts only valid subjects.
  - Shows error for invalid or empty input.

#### 1.9. Hobbies Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Select one or more hobbies.
  2. Submit without selecting any hobby.

**Expected Results:**
  - Multiple selections allowed.
  - No error if not selected (if not required).

#### 1.10. Picture Upload Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Upload a valid image file.
  2. Upload a non-image file.
  3. Submit without uploading.

**Expected Results:**
  - Accepts only image files.
  - Shows error for invalid file type (if validated).

#### 1.11. Current Address Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Enter a valid address.
  2. Enter special characters.
  3. Leave the field blank and submit.

**Expected Results:**
  - Accepts all characters.
  - No error for blank (if not required).

#### 1.12. State and City Field Validation

**File:** `specs/testcase.md`

**Steps:**
  1. Select a valid state and city.
  2. Submit without selecting state or city.

**Expected Results:**
  - Both fields must be selected.
  - Shows error if not selected.

#### 1.13. Successful Submission

**File:** `specs/testcase.md`

**Steps:**
  1. Fill all fields with valid data.
  2. Submit the form.

**Expected Results:**
  - Form submits successfully.
  - Confirmation modal appears with correct data.
