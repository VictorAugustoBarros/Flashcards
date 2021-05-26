from app.connections.sqlite_model import SqliteModelConnection


class SqliteConn(SqliteModelConnection):
    """Classe com conexão para o banco de Sms."""

    def __init__(self):
        """Construtor da class SmsMysql."""
        super().__init__(database="flashcards")
