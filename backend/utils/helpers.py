"""
utils/helpers.py - Shared Utility Functions
"""
import time
import random
import string
from datetime import datetime
from flask import jsonify


def generate_id(prefix: str = 'item') -> str:
    """Generate a unique ID with timestamp and random suffix."""
    timestamp = int(time.time() * 1000)
    return f"{prefix}-{timestamp}"


def generate_receipt_id() -> str:
    """Generate a donation receipt ID like HH-123456."""
    number = random.randint(100000, 999999)
    return f"HH-{number}"


def current_timestamp() -> str:
    """Return a human-readable timestamp string."""
    return datetime.now().strftime('%Y-%m-%d %I:%M %p')


def find_by_id(collection: list, item_id: str) -> dict | None:
    """Find an item in a list by its 'id' field. Returns None if not found."""
    return next((item for item in collection if item.get('id') == item_id), None)


def find_index_by_id(collection: list, item_id: str) -> int:
    """Find the index of an item in a list by its 'id' field. Returns -1 if not found."""
    for i, item in enumerate(collection):
        if item.get('id') == item_id:
            return i
    return -1


def success_response(data=None, message: str = 'Success', status: int = 200):
    """Build a standardized success JSON response dict."""
    response = {'success': True, 'message': message}
    if data is not None:
        response['data'] = data
    return response, status


def error_response(message: str = 'An error occurred', errors: dict = None, status: int = 400):
    """Build a standardized error JSON response dict."""
    response = {'success': False, 'message': message}
    if errors:
        response['errors'] = errors
    return response, status


def jsonify_response(payload: dict, status: int = 200):
    """Create a Flask JSON response while preserving its HTTP status code."""
    return jsonify(payload), status


def sanitize_string(value) -> str:
    """Convert value to string and strip whitespace."""
    return str(value).strip() if value is not None else ''
