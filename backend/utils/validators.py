"""
utils/validators.py - Reusable Form Validation Helpers
All validators return (is_valid: bool, error_message: str | None)
"""
import re


def validate_required(value: str, field_name: str):
    """Check that a string field is non-empty after stripping."""
    if not value or not str(value).strip():
        return False, f"{field_name} is required."
    return True, None


def validate_min_length(value: str, field_name: str, min_len: int):
    """Check minimum string length."""
    if len(str(value).strip()) < min_len:
        return False, f"{field_name} must be at least {min_len} characters."
    return True, None


def validate_email(email: str):
    """Validate email format."""
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if not email or not re.match(pattern, email.strip()):
        return False, "Please provide a valid email address."
    return True, None


def validate_phone(phone: str):
    """Validate phone format (8-15 digits, allows +, spaces, dashes)."""
    pattern = r'^[0-9+\s\-]{8,15}$'
    if not phone or not re.match(pattern, phone.strip()):
        return False, "Please provide a valid phone number (e.g. 03233747970)."
    return True, None


def validate_positive_number(value, field_name: str):
    """Validate that value is a positive number."""
    try:
        num = float(value)
        if num <= 0:
            raise ValueError
        return True, None
    except (ValueError, TypeError):
        return False, f"{field_name} must be a positive number."


def collect_errors(*validation_results) -> dict:
    """
    Collect multiple validation results into an errors dict.
    Usage: collect_errors(('name', validate_required(name, 'Name')), ...)
    Returns {} if all valid.
    """
    errors = {}
    for field, (is_valid, error_msg) in validation_results:
        if not is_valid:
            errors[field] = error_msg
    return errors


def validate_contact_form(data: dict) -> dict:
    """Validate contact form fields. Returns error dict (empty = valid)."""
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()

    errors = {}

    # Name
    ok, err = validate_required(name, 'Full Name')
    if not ok:
        errors['name'] = err
    elif len(name) < 3:
        errors['name'] = "Name must be at least 3 characters."

    # Email
    ok, err = validate_email(email)
    if not ok:
        errors['email'] = err

    # Phone
    ok, err = validate_phone(phone)
    if not ok:
        errors['phone'] = err

    # Message
    ok, err = validate_required(message, 'Message')
    if not ok:
        errors['message'] = err
    elif len(message) < 10:
        errors['message'] = "Message must be at least 10 characters."

    return errors


def validate_volunteer_form(data: dict) -> dict:
    """Validate volunteer application form fields."""
    full_name = data.get('fullName', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    area = data.get('areaOfInterest', '').strip()
    message = data.get('message', '').strip()

    errors = {}

    ok, err = validate_required(full_name, 'Full Name')
    if not ok:
        errors['fullName'] = err
    elif len(full_name) < 3:
        errors['fullName'] = "Name must be at least 3 characters."

    ok, err = validate_email(email)
    if not ok:
        errors['email'] = err

    ok, err = validate_phone(phone)
    if not ok:
        errors['phone'] = err

    if not area:
        errors['areaOfInterest'] = "Please select an area of interest."

    ok, err = validate_required(message, 'Skills/Motivation')
    if not ok:
        errors['message'] = err
    elif len(message) < 10:
        errors['message'] = "Please write at least 10 characters."

    return errors


def validate_donation_form(data: dict) -> dict:
    """Validate donation form fields."""
    amount = data.get('amount')
    donor_email = data.get('donorEmail', '').strip()
    is_anonymous = data.get('isAnonymous', False)
    donor_name = data.get('donorName', '').strip()

    errors = {}

    ok, err = validate_positive_number(amount, 'Donation Amount')
    if not ok:
        errors['amount'] = err

    ok, err = validate_email(donor_email)
    if not ok:
        errors['donorEmail'] = err

    if not is_anonymous and not donor_name:
        errors['donorName'] = 'Please enter your name or check "Donate Anonymously".'

    return errors


def validate_program_form(data: dict) -> dict:
    """Validate admin program form."""
    errors = {}
    title = data.get('title', '').strip()
    if not title:
        errors['title'] = "Program title is required."
    goal = data.get('goal', 0)
    ok, err = validate_positive_number(goal, 'Goal')
    if not ok:
        errors['goal'] = err
    return errors


def validate_project_form(data: dict) -> dict:
    """Validate admin project form."""
    errors = {}
    title = data.get('title', '').strip()
    if not title:
        errors['title'] = "Project title is required."
    return errors


def validate_testimonial_form(data: dict) -> dict:
    """Validate admin testimonial form."""
    errors = {}
    name = data.get('name', '').strip()
    quote = data.get('quote', '').strip()
    if not name:
        errors['name'] = "Name is required."
    if not quote:
        errors['quote'] = "Quote is required."
    return errors
