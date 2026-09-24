"""
routes/admin.py - Admin-only Dashboard & Inbox Routes
All routes protected by @require_admin decorator.
"""
from flask import Blueprint, request, jsonify
import models.store as store
from middleware.auth_guard import require_admin
from utils.helpers import jsonify_response, success_response, error_response, find_index_by_id

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


@admin_bp.route('/dashboard', methods=['GET'])
@require_admin
def get_dashboard_stats():
    """
    GET /api/admin/dashboard
    Returns aggregated statistics for the admin overview panel.
    """
    total_raised = sum(float(p.get('raised', 0)) for p in store.programs)
    total_goal = sum(float(p.get('goal', 0)) for p in store.programs)
    unread_messages = sum(1 for m in store.contact_messages if not m.get('read', True))
    pending_volunteers = sum(1 for v in store.volunteer_applications if v.get('status') == 'Pending')
    total_donations = sum(float(d.get('amount', 0)) for d in store.donations)
    
    stats = {
        'programs': {
            'total': len(store.programs),
            'totalRaised': total_raised,
            'totalGoal': total_goal,
            'percentFunded': round((total_raised / total_goal * 100) if total_goal > 0 else 0, 1),
        },
        'projects': {
            'total': len(store.projects),
            'completed': sum(1 for p in store.projects if p.get('status') == 'Completed'),
            'inProgress': sum(1 for p in store.projects if p.get('status') == 'In Progress'),
            'upcoming': sum(1 for p in store.projects if p.get('status') == 'Upcoming'),
        },
        'testimonials': {
            'total': len(store.testimonials),
        },
        'messages': {
            'total': len(store.contact_messages),
            'unread': unread_messages,
        },
        'volunteers': {
            'total': len(store.volunteer_applications),
            'pending': pending_volunteers,
            'reviewed': sum(1 for v in store.volunteer_applications if v.get('status') == 'Reviewed'),
        },
        'donations': {
            'total': len(store.donations),
            'totalAmount': total_donations,
        },
        'inbox': {
            'totalSubmissions': len(store.contact_messages) + len(store.volunteer_applications),
        },
    }

    return jsonify_response(*success_response(data=stats, message='Dashboard statistics retrieved.'))


# --- Contact Messages ---

@admin_bp.route('/messages', methods=['GET'])
@require_admin
def get_messages():
    """GET /api/admin/messages - List all contact messages."""
    return jsonify_response(*success_response(
        data=store.contact_messages,
        message=f'{len(store.contact_messages)} messages retrieved.'
    ))


@admin_bp.route('/messages/<string:msg_id>/read', methods=['PATCH'])
@require_admin
def mark_message_read(msg_id):
    """PATCH /api/admin/messages/<id>/read - Mark a message as read."""
    idx = find_index_by_id(store.contact_messages, msg_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Message "{msg_id}" not found.', status=404))
    store.contact_messages[idx]['read'] = True
    return jsonify_response(*success_response(message='Message marked as read.'))


@admin_bp.route('/messages/<string:msg_id>', methods=['DELETE'])
@require_admin
def delete_message(msg_id):
    """DELETE /api/admin/messages/<id> - Delete a contact message."""
    idx = find_index_by_id(store.contact_messages, msg_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Message "{msg_id}" not found.', status=404))
    removed = store.contact_messages.pop(idx)
    return jsonify_response(*success_response(
        data={'id': removed['id']},
        message=f'Message from {removed["name"]} deleted.'
    ))


# --- Volunteer Applications ---

@admin_bp.route('/volunteers', methods=['GET'])
@require_admin
def get_volunteers():
    """GET /api/admin/volunteers - List all volunteer applications."""
    return jsonify_response(*success_response(
        data=store.volunteer_applications,
        message=f'{len(store.volunteer_applications)} applications retrieved.'
    ))


@admin_bp.route('/volunteers/<string:app_id>/status', methods=['PATCH'])
@require_admin
def update_volunteer_status(app_id):
    """PATCH /api/admin/volunteers/<id>/status - Update application status."""
    data = request.get_json(silent=True) or {}
    new_status = str(data.get('status', '')).strip()

    allowed_statuses = ['Pending', 'Reviewed', 'Accepted', 'Rejected']
    if new_status not in allowed_statuses:
        return jsonify_response(*error_response(
            f'Invalid status. Allowed: {", ".join(allowed_statuses)}'
        ))

    idx = find_index_by_id(store.volunteer_applications, app_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Application "{app_id}" not found.', status=404))

    store.volunteer_applications[idx]['status'] = new_status
    return jsonify_response(*success_response(
        data={'id': app_id, 'status': new_status},
        message=f'Application status updated to "{new_status}".'
    ))


@admin_bp.route('/volunteers/<string:app_id>', methods=['DELETE'])
@require_admin
def delete_volunteer(app_id):
    """DELETE /api/admin/volunteers/<id> - Delete a volunteer application."""
    idx = find_index_by_id(store.volunteer_applications, app_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Application "{app_id}" not found.', status=404))
    removed = store.volunteer_applications.pop(idx)
    return jsonify_response(*success_response(
        data={'id': removed['id']},
        message=f'Application from {removed["fullName"]} deleted.'
    ))


# --- Donations ---

@admin_bp.route('/donations', methods=['GET'])
@require_admin
def get_donations():
    """GET /api/admin/donations - List all recorded donations."""
    return jsonify_response(*success_response(
        data=store.donations,
        message=f'{len(store.donations)} donations retrieved.'
    ))
