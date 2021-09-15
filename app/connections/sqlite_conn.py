"""Sqlite Connection."""
from app.connections.sqlite_model import SqliteModelConnection


class SqliteConn(SqliteModelConnection):
    """Classe com conexão para o SQLite3."""

    def __init__(self):
        """Construtor da classe."""
        super().__init__(database="flashcards.db")
