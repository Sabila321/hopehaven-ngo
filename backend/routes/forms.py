"""
routes/forms.py - Public Form Submission Routes
Handles contact messages, volunteer applications, and donation records.
No authentication required - these are public-facing forms.
"""
from flask import Blueprint, request, jsonify
import models.store as store
from utils.helpers import jsonify_response, generate_id, generate_receipt_id, current_timestamp, success_response, error_response
from utils.validators import validate_contact_form, validate_volunteer_form, validate_donation_form

forms_bp = Blueprint('forms', __name__, url_prefix='/api')


@forms_bp.route('/contact', methods=['POST'])
def submit_contact():
    """
    POST /api/contact
    Submit a contact/inquiry form message.
    Body: { name, email, phone, subject, message }
    """
    data = request.get_json(silent=True) or {}

    errors = validate_contact_form(data)
    if errors:
        return jsonify_response(*error_response('Please fix the form errors below.', errors=errors))

    new_message = {
        'id': generate_id('msg'),
        'name': str(data.get('name', '')).strip(),
        'email': str(data.get('email', '')).strip().lower(),
        'phone': str(data.get('phone', '')).strip(),
        'subject': str(data.get('subject', 'General Inquiry')).strip(),
        'message': str(data.get('message', '')).strip(),
        'date': current_timestamp(),
        'read': False,
    }

    store.contact_messages.insert(0, new_message)

    return jsonify_response(*success_response(
        data={'id': new_message['id']},
        message='Thank you! Your message has been received. We will respond within 24 hours.',
        status=201
    ))


@forms_bp.route('/volunteer', methods=['POST'])
def submit_volunteer():
    """
    POST /api/volunteer
    Submit a volunteer application.
    Body: { fullName, email, phone, areaOfInterest, availability, message }
    """
    data = request.get_json(silent=True) or {}

    errors = validate_volunteer_form(data)
    if errors:
        return jsonify_response(*error_response('Please fix the form errors below.', errors=errors))

    new_application = {
        'id': generate_id('app'),
        'fullName': str(data.get('fullName', '')).strip(),
        'email': str(data.get('email', '')).strip().lower(),
        'phone': str(data.get('phone', '')).strip(),
        'areaOfInterest': str(data.get('areaOfInterest', '')).strip(),
        'availability': str(data.get('availability', 'Weekends Only')).strip(),
        'message': str(data.get('message', '')).strip(),
        'date': current_timestamp(),
        'status': 'Pending',
    }

    store.volunteer_applications.insert(0, new_application)

    return jsonify_response(*success_response(
        data={'id': new_application['id']},
        message='Thank you for your application! Our volunteer coordinator will contact you within 48 hours.',
        status=201
    ))


@forms_bp.route('/donate', methods=['POST'])
def submit_donation():
    """
    POST /api/donate
    Record a simulated donation submission.
    Body: { amount, frequency, selectedCause, donorName, donorEmail, donorPhone, isAnonymous, dedication }
    Note: No real payment gateway. This records the intent for admin tracking.
    """
    data = request.get_json(silent=True) or {}

    errors = validate_donation_form(data)
    if errors:
        return jsonify_response(*error_response('Please fix the form errors below.', errors=errors))

    is_anonymous = bool(data.get('isAnonymous', False))
    amount = float(data.get('amount', 0))
    receipt_id = generate_receipt_id()

    # Find cause label from programs store
    cause_id = str(data.get('selectedCause', 'where-most-needed'))
    cause_obj = next((p for p in store.programs if p['id'] == cause_id), None)
    cause_label = cause_obj['title'] if cause_obj else 'Where Needed Most (General Humanitarian Fund)'

    new_donation = {
        'id': generate_id('don'),
        'receiptId': receipt_id,
        'amount': amount,
        'frequency': str(data.get('frequency', 'one-time')).strip(),
        'cause': cause_label,
        'causeId': cause_id,
        'donorName': 'Anonymous Philanthropist' if is_anonymous else str(data.get('donorName', '')).strip(),
        'donorEmail': str(data.get('donorEmail', '')).strip().lower(),
        'donorPhone': str(data.get('donorPhone', 'Not provided')).strip(),
        'isAnonymous': is_anonymous,
        'dedication': str(data.get('dedication', '')).strip(),
        'date': current_timestamp(),
        'status': 'Simulated',   # Real payment processing not implemented
    }

    store.donations.insert(0, new_donation)

    return jsonify_response(*success_response(
        data={
            'receiptId': receipt_id,
            'amount': amount,
            'cause': cause_label,
            'donorName': new_donation['donorName'],
            'donorEmail': new_donation['donorEmail'],
            'frequency': new_donation['frequency'],
            'date': new_donation['date'],
        },
        message='Donation recorded successfully. Thank you for your generosity!',
        status=201
    ))
