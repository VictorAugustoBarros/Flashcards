"""Interface modelo das tabelas do Sqlite3."""
import sqlite3
from app.connections.errors import DeleteFailed, ExecuteQueryFailed, ConnectionFailed, InsertFailed, UpdateFailed, \
    ProgrammingError, OperationalError


class Model:  # pragma: no cover
    """Classe de interface dos modelos."""

    _table = ""
    _pk = ""

    def __init__(self, sqlite_conn: sqlite3):
        """Construtor da modelo."""
        self.sqlite_conn = sqlite_conn

    def _insert_fields(self, columns: tuple, values: list):
        """
        Insere os dados das colunas e valores na tabela.

        Args:
            columns (tuple): e.g ("column1", "column2", "column2", ...)
            values (list): e.g.  [(value1, value2, value3), (value1, value2, value3), ...]
        Returns:
            resultado ou raise InsertFailed exceção
        """
        try:
            result = self.sqlite_conn.insert_fields(
                table=self._table, columns_insert=columns, values_insert=values
            )
        except InsertFailed as error:
            raise error

        return result

    def fetch_all(
        self,
        table: str,
        fields="*",
        where=None,
        distinct=False,
        group=None,
        order=None,
        limit=None,
    ):

        if limit is None:
            limit = [1000]

        cur = self.sqlite_conn.select(
            table=table,
            fields=fields,
            distinct=distinct,
            where=where,
            group=group,
            order=order,
            limit=limit,
        )
        rows = cur.fetchall()
        return rows
