"""
middleware/auth_guard.py - Admin Authentication Guard
Use @require_admin decorator to protect any Flask route.
Returns 401 JSON if the session does not contain a valid admin login.
"""
from functools import wraps
from flask import session, jsonify


def require_admin(f):
    """
    Decorator: protect a route - only accessible by authenticated admins.
    Returns 401 JSON if not authenticated.
    Usage:
        @app.route('/api/admin/something')
        @require_admin
        def something():
            ...
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('is_admin'):
            return jsonify({
                'success': False,
                'message': 'Unauthorized. Admin login required.',
                'redirect': '/admin/login'
            }), 401
        return f(*args, **kwargs)
    return decorated_function
