"""
routes/settings.py - Site Settings Routes
Public: GET /api/settings
Admin: PUT /api/settings (protected)
"""
from flask import Blueprint, request, jsonify
import models.store as store
from middleware.auth_guard import require_admin
from utils.helpers import jsonify_response, success_response, error_response

settings_bp = Blueprint('settings', __name__, url_prefix='/api/settings')


@settings_bp.route('', methods=['GET'])
def get_settings():
    """GET /api/settings - Public. Returns current site settings."""
    return jsonify_response(*success_response(data=store.settings, message='Settings retrieved.'))


@settings_bp.route('', methods=['PUT'])
@require_admin
def update_settings():
    """PUT /api/settings - Admin only. Update site settings."""
    data = request.get_json(silent=True) or {}

    # Only update known keys to prevent injection of unexpected fields
    allowed_keys = ['phone', 'email', 'address', 'organizationName',
                    'heroBadge', 'heroTitle', 'heroSubtitle']

    for key in allowed_keys:
        if key in data:
            store.settings[key] = str(data[key]).strip()

    # Handle nested stats object
    if 'stats' in data and isinstance(data['stats'], dict):
        for stat_key in ['lives', 'volunteers', 'projects', 'communities']:
            if stat_key in data['stats']:
                store.settings['stats'][stat_key] = str(data['stats'][stat_key]).strip()

    return jsonify_response(*success_response(data=store.settings, message='Settings updated successfully.'))


@settings_bp.route('/reset', methods=['POST'])
@require_admin
def reset_all_data():
    """POST /api/settings/reset - Admin only. Reset all in-memory data to defaults."""
    import models.store as s
    s.reset_to_defaults()
    return jsonify_response(*success_response(message='All data reset to factory defaults.'))
