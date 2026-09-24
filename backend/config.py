"""
config.py - Flask Application Configuration
Reads from .env file. Easy to extend for different environments.
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Security
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'hopehaven-dev-secret-change-in-prod')
    
    # Admin credentials (no database - stored in env)
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'sabilamemon7@gmail.com').strip().lower()
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'SabilaAdmin@2026#NGO').strip()
    
    # CORS - allow the Vite frontend
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
    
    # Session settings
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    SESSION_COOKIE_SECURE = False   # Set True in production with HTTPS
    
    # Flask
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    PORT = int(os.environ.get('FLASK_PORT', 5000))

    # MySQL / MariaDB persistence
    DB_HOST = os.environ.get('DB_HOST', '127.0.0.1')
    DB_PORT = int(os.environ.get('DB_PORT', 3306))
    DB_NAME = os.environ.get('DB_NAME', 'hopehaven')
    DB_USER = os.environ.get('DB_USER', 'root')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', '')
