"""
routes/programs.py - Programs (Humanitarian Causes) CRUD Routes
Public: GET /api/programs
Admin: POST, PUT, DELETE (protected by @require_admin)
"""
from flask import Blueprint, request, jsonify
import models.store as store
from middleware.auth_guard import require_admin
from utils.helpers import (
    jsonify_response,
    generate_id, success_response, error_response,
    find_by_id, find_index_by_id
)
from utils.validators import validate_program_form

programs_bp = Blueprint('programs', __name__, url_prefix='/api/programs')


@programs_bp.route('', methods=['GET'])
def get_programs():
    """GET /api/programs - Public. Returns all programs."""
    return jsonify_response(*success_response(
        data=store.programs,
        message=f'{len(store.programs)} programs retrieved.'
    ))


@programs_bp.route('', methods=['POST'])
@require_admin
def add_program():
    """POST /api/programs - Admin only. Add a new program."""
    data = request.get_json(silent=True) or {}

    errors = validate_program_form(data)
    if errors:
        return jsonify_response(*error_response('Validation failed.', errors=errors))

    new_program = {
        'id': data.get('id') or generate_id('cause'),
        'title': str(data.get('title', '')).strip(),
        'category': str(data.get('category', 'Clean Water')).strip(),
        'summary': str(data.get('summary', '')).strip(),
        'description': str(data.get('description', '')).strip(),
        'goal': float(data.get('goal', 50000)),
        'raised': float(data.get('raised', 0)),
        'beneficiaries': str(data.get('beneficiaries', '')).strip(),
        'image': str(data.get('image', '')).strip(),
        'urgency': str(data.get('urgency', 'Moderate')).strip(),
        'featured': bool(data.get('featured', True)),
    }

    store.programs.insert(0, new_program)
    return jsonify_response(*success_response(
        data=new_program,
        message='Program added successfully.',
        status=201
    ))


@programs_bp.route('/<string:program_id>', methods=['PUT'])
@require_admin
def update_program(program_id):
    """PUT /api/programs/<id> - Admin only. Update a program."""
    data = request.get_json(silent=True) or {}

    idx = find_index_by_id(store.programs, program_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Program "{program_id}" not found.', status=404))

    errors = validate_program_form(data)
    if errors:
        return jsonify_response(*error_response('Validation failed.', errors=errors))

    # Merge updates into existing record
    existing = store.programs[idx]
    existing.update({
        'title': str(data.get('title', existing['title'])).strip(),
        'category': str(data.get('category', existing['category'])).strip(),
        'summary': str(data.get('summary', existing.get('summary', ''))).strip(),
        'description': str(data.get('description', existing.get('description', ''))).strip(),
        'goal': float(data.get('goal', existing['goal'])),
        'raised': float(data.get('raised', existing['raised'])),
        'beneficiaries': str(data.get('beneficiaries', existing.get('beneficiaries', ''))).strip(),
        'image': str(data.get('image', existing.get('image', ''))).strip(),
        'urgency': str(data.get('urgency', existing.get('urgency', 'Moderate'))).strip(),
        'featured': bool(data.get('featured', existing.get('featured', True))),
    })

    return jsonify_response(*success_response(
        data=store.programs[idx],
        message='Program updated successfully.'
    ))


@programs_bp.route('/<string:program_id>', methods=['DELETE'])
@require_admin
def delete_program(program_id):
    """DELETE /api/programs/<id> - Admin only. Remove a program."""
    idx = find_index_by_id(store.programs, program_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Program "{program_id}" not found.', status=404))

    removed = store.programs.pop(idx)
    return jsonify_response(*success_response(
        data={'id': removed['id']},
        message=f'Program "{removed["title"]}" deleted.'
    ))
