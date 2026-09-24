"""
app.py - HopeHaven NGO Flask Backend
Entry point. Registers all blueprints, CORS, and error handlers.

Run with:
    python app.py
Or with Flask CLI:
    flask run --port 5000
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from database import database

# Import all route blueprints
from routes.auth import auth_bp
from routes.programs import programs_bp
from routes.projects import projects_bp
from routes.testimonials import testimonials_bp
from routes.settings import settings_bp
from routes.forms import forms_bp
from routes.admin import admin_bp


def create_app():
    """Application factory - creates and configures the Flask app."""
    app = Flask(__name__)
    app.config.from_object(Config)
    database.initialize()

    # ---------------------------------------------------------------------------
    # CORS Configuration
    # Allow requests from the Vite frontend at localhost:3000
    # Supports credentials (cookies/sessions)
    # ---------------------------------------------------------------------------
    CORS(app,
         origins=[Config.FRONTEND_URL],
         supports_credentials=True,
         allow_headers=['Content-Type', 'Authorization'],
         methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])

    @app.after_request
    def persist_successful_changes(response):
        """Persist data mutations only after the route has completed successfully."""
        if (
            database.enabled
            and request.method in {'POST', 'PUT', 'PATCH', 'DELETE'}
            and response.status_code < 400
            and not request.path.startswith('/api/auth/')
        ):
            try:
                database.save_state()
            except Exception as exc:
                app.logger.error('Could not persist MySQL state: %s', exc)
        return response

    # ---------------------------------------------------------------------------
    # Register Blueprints
    # ---------------------------------------------------------------------------
    app.register_blueprint(auth_bp)         # /api/auth/*
    app.register_blueprint(programs_bp)     # /api/programs/*
    app.register_blueprint(projects_bp)     # /api/projects/*
    app.register_blueprint(testimonials_bp) # /api/testimonials/*
    app.register_blueprint(settings_bp)     # /api/settings/*
    app.register_blueprint(forms_bp)        # /api/contact, /api/volunteer, /api/donate
    app.register_blueprint(admin_bp)        # /api/admin/*

    # ---------------------------------------------------------------------------
    # Health Check
    # ---------------------------------------------------------------------------
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """GET /api/health - Quick server health check."""
        return jsonify({
            'status': 'ok',
            'service': 'HopeHaven NGO Backend',
            'version': '1.0.0'
        })

    # ---------------------------------------------------------------------------
    # Global Error Handlers
    # ---------------------------------------------------------------------------
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({'success': False, 'message': 'Bad request.', 'error': str(e)}), 400

    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify({'success': False, 'message': 'Unauthorized. Admin login required.'}), 401

    @app.errorhandler(403)
    def forbidden(e):
        return jsonify({'success': False, 'message': 'Forbidden.'}), 403

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'success': False, 'message': 'Route not found.'}), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify({'success': False, 'message': 'Method not allowed.'}), 405

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'success': False, 'message': 'Internal server error. Please try again.'}), 500

    return app


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------
app = create_app()
if __name__ == '__main__':
    app = create_app()
    print("\n" + "="*60)
    print("  HopeHaven NGO - Flask Backend")
    print("  Running at: http://localhost:5000")
    print("  Frontend:   http://localhost:3000")
    print("  Health:     http://localhost:5000/api/health")
    print("="*60 + "\n")
    app.run(
        host='0.0.0.0',
        port=Config.PORT,
        debug=Config.DEBUG
    )
