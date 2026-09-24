"""MySQL/MariaDB persistence for the HopeHaven application state."""
import json
import logging

import pymysql

import models.store as store
from config import Config


logger = logging.getLogger(__name__)


class Database:
    def __init__(self):
        self.enabled = False

    def _connect(self, database=None):
        return pymysql.connect(
            host=Config.DB_HOST,
            port=Config.DB_PORT,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=database,
            charset='utf8mb4',
            autocommit=True,
        )

    def initialize(self):
        """Create the database/table if required and restore saved state."""
        try:
            with self._connect() as connection:
                with connection.cursor() as cursor:
                    cursor.execute(
                        f"CREATE DATABASE IF NOT EXISTS `{Config.DB_NAME}` "
                        "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
                    )

            with self._connect(Config.DB_NAME) as connection:
                with connection.cursor() as cursor:
                    cursor.execute(
                        "CREATE TABLE IF NOT EXISTS app_state ("
                        "state_key VARCHAR(64) PRIMARY KEY, "
                        "payload LONGTEXT NOT NULL, "
                        "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP "
                        "ON UPDATE CURRENT_TIMESTAMP)"
                    )
                    cursor.execute(
                        "SELECT payload FROM app_state WHERE state_key = %s",
                        ('site_data',),
                    )
                    row = cursor.fetchone()

            self.enabled = True
            if row:
                store.load_state(json.loads(row[0]))
                logger.info('Loaded HopeHaven state from MySQL.')
            else:
                self.save_state()
                logger.info('Created initial HopeHaven state in MySQL.')
        except Exception as exc:
            self.enabled = False
            logger.warning('MySQL is unavailable; using in-memory data: %s', exc)

    def save_state(self):
        """Save the current application state after a successful data mutation."""
        if not self.enabled:
            return
        payload = json.dumps(store.export_state(), ensure_ascii=False)
        with self._connect(Config.DB_NAME) as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO app_state (state_key, payload) VALUES (%s, %s) "
                    "ON DUPLICATE KEY UPDATE payload = VALUES(payload)",
                    ('site_data', payload),
                )


database = Database()
