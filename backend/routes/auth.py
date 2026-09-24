"""
routes/auth.py - Admin Authentication Routes
Handles login, logout, and session status checks.
Uses Flask server-side sessions (no JWT, no database).
"""
from flask import Blueprint, request, session, jsonify, current_app
from utils.helpers import jsonify_response, success_response, error_response

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    POST /api/auth/login
    Body: { "email": "...", "password": "..." }
    Returns: { success, message, email } or { success, message, error }
    """
    data = request.get_json(silent=True) or {}

    email = str(data.get('email', '')).strip().lower()
    password = str(data.get('password', '')).strip()

    # Validate required fields
    if not email or not password:
        return jsonify_response(*error_response('Email and password are required.', status=400))

    # Load expected credentials from app config
    expected_email = current_app.config['ADMIN_EMAIL'].strip().lower()
    expected_password = current_app.config['ADMIN_PASSWORD'].strip()

    # Check credentials
    if email != expected_email:
        return jsonify_response(*error_response('Invalid admin email address.', status=401))

    if password != expected_password:
        return jsonify_response(*error_response(
            'Invalid admin password. Please check your credentials.', status=401
        ))

    # Set server-side session
    session.permanent = False
    session['is_admin'] = True
    session['admin_email'] = email

    return jsonify_response(*success_response(
        data={'email': email},
        message='Login successful.'
    ))


@auth_bp.route('/logout', methods=['POST'])
def logout():
    """
    POST /api/auth/logout
    Clears the admin session.
    """
    session.clear()
    return jsonify_response(*success_response(message='Logged out successfully.'))


@auth_bp.route('/status', methods=['GET'])
def status():
    """
    GET /api/auth/status
    Returns current session auth state.
    Used by frontend on mount to restore auth state.
    """
    is_admin = bool(session.get('is_admin'))
    email = session.get('admin_email', None)
    return jsonify_response(*success_response(
        data={'authenticated': is_admin, 'email': email},
        message='Session status retrieved.'
    ))
