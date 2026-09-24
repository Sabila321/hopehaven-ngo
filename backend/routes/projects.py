"""
routes/projects.py - Field Projects CRUD Routes
Public: GET /api/projects
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
from utils.validators import validate_project_form

projects_bp = Blueprint('projects', __name__, url_prefix='/api/projects')


@projects_bp.route('', methods=['GET'])
def get_projects():
    """GET /api/projects - Public."""
    return jsonify_response(*success_response(
        data=store.projects,
        message=f'{len(store.projects)} projects retrieved.'
    ))


@projects_bp.route('', methods=['POST'])
@require_admin
def add_project():
    """POST /api/projects - Admin only."""
    data = request.get_json(silent=True) or {}

    errors = validate_project_form(data)
    if errors:
        return jsonify_response(*error_response('Validation failed.', errors=errors))

    new_project = {
        'id': data.get('id') or generate_id('proj'),
        'title': str(data.get('title', '')).strip(),
        'category': str(data.get('category', 'Clean Water')).strip(),
        'status': str(data.get('status', 'In Progress')).strip(),
        'location': str(data.get('location', '')).strip(),
        'year': str(data.get('year', '2025')).strip(),
        'impact': str(data.get('impact', '')).strip(),
        'description': str(data.get('description', '')).strip(),
        'image': str(data.get('image', '')).strip(),
        'featured': bool(data.get('featured', True)),
    }

    store.projects.insert(0, new_project)
    return jsonify_response(*success_response(data=new_project, message='Project added successfully.', status=201))


@projects_bp.route('/<string:project_id>', methods=['PUT'])
@require_admin
def update_project(project_id):
    """PUT /api/projects/<id> - Admin only."""
    data = request.get_json(silent=True) or {}
    idx = find_index_by_id(store.projects, project_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Project "{project_id}" not found.', status=404))

    errors = validate_project_form(data)
    if errors:
        return jsonify_response(*error_response('Validation failed.', errors=errors))

    existing = store.projects[idx]
    existing.update({
        'title': str(data.get('title', existing['title'])).strip(),
        'category': str(data.get('category', existing['category'])).strip(),
        'status': str(data.get('status', existing['status'])).strip(),
        'location': str(data.get('location', existing.get('location', ''))).strip(),
        'year': str(data.get('year', existing.get('year', ''))).strip(),
        'impact': str(data.get('impact', existing.get('impact', ''))).strip(),
        'description': str(data.get('description', existing.get('description', ''))).strip(),
        'image': str(data.get('image', existing.get('image', ''))).strip(),
        'featured': bool(data.get('featured', existing.get('featured', True))),
    })

    return jsonify_response(*success_response(data=store.projects[idx], message='Project updated successfully.'))


@projects_bp.route('/<string:project_id>', methods=['DELETE'])
@require_admin
def delete_project(project_id):
    """DELETE /api/projects/<id> - Admin only."""
    idx = find_index_by_id(store.projects, project_id)
    if idx == -1:
        return jsonify_response(*error_response(f'Project "{project_id}" not found.', status=404))

    removed = store.projects.pop(idx)
    return jsonify_response(*success_response(data={'id': removed['id']}, message=f'Project "{removed["title"]}" deleted.'))
