"""
routes/testimonials.py - Testimonials CRUD Routes
Public: GET /api/testimonials
Admin: POST, PUT, DELETE (protected by @require_admin)
"""
from flask import Blueprint, request, jsonify
import models.store as store
from middleware.auth_guard import require_admin
from utils.helpers import (
    jsonify_response,
    generate_id, success_response, error_response,
    find_index_by_id
)
from utils.validators import validate_testimonial_form

testimonials_bp = Blueprint('testimonials', __name__, url_prefix='/api/testimonials')


@testimonials_bp.route('', methods=['GET'])
def get_testimonials():
    """GET /api/testimonials - Public."""
    return jsonify_response(*success_response(
        data=store.testimonials,
        message=f'{len(store.testimonials)} testimonials retrieved.'
    ))


@testimonials_bp.route('', methods=['POST'])
@require_admin
def add_testimonial():
    """POST /api/testimonials - Admin only."""
    data = request.get_json(silent=True) or {}
    errors = validate_testimonial_form(data)
    if errors:
        return jsonify_response(*error_response('Validation failed.', errors=errors))

    new_testimonial = {
        'id': data.get('id') or generate_id('test'),
        'name': str(data.get('name', '')).strip(),
        'role': str(data.get('role', 'Community Member')).strip(),
        'location': str(data.get('location', '')).strip(),
        'quote': str(data.get('quote', '')).strip(),
        'avatar': str(data.get('avatar', '')).strip(),
        'rating': int(data.get('rating', 5)),
    }

    store.testimonials.insert(0, new_testimonial)
    return jsonify_response(*success_response(data=new_testimonial, message='Testimonial added.', status=201))


@testimonials_bp.route('/<string:testimonial_id>', methods=['PUT'])
@require_admin
def update_testimonial(testimonial_id):
    """PUT /api/testimonials/<id> - Admin only."""
    data = request.get_json(silent=True) or {}
    idx = find_index_by_id(store.testimonials, testimonial_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Testimonial "{testimonial_id}" not found.', status=404))

    errors = validate_testimonial_form(data)
    if errors:
        return jsonify_response(*error_response('Validation failed.', errors=errors))

    existing = store.testimonials[idx]
    existing.update({
        'name': str(data.get('name', existing['name'])).strip(),
        'role': str(data.get('role', existing['role'])).strip(),
        'location': str(data.get('location', existing.get('location', ''))).strip(),
        'quote': str(data.get('quote', existing['quote'])).strip(),
        'avatar': str(data.get('avatar', existing.get('avatar', ''))).strip(),
        'rating': int(data.get('rating', existing.get('rating', 5))),
    })

    return jsonify_response(*success_response(data=store.testimonials[idx], message='Testimonial updated.'))


@testimonials_bp.route('/<string:testimonial_id>', methods=['DELETE'])
@require_admin
def delete_testimonial(testimonial_id):
    """DELETE /api/testimonials/<id> - Admin only."""
    idx = find_index_by_id(store.testimonials, testimonial_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Testimonial "{testimonial_id}" not found.', status=404))

    removed = store.testimonials.pop(idx)
    return jsonify_response(*success_response(data={'id': removed['id']}, message='Testimonial deleted.'))
