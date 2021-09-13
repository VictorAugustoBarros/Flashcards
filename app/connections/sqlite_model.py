"""
Mysql Database Module.

Documentation:
https://mysqlclient.readthedocs.io/

Repo:https://github.com/PyMySQL/mysqlclient-python

Benchmark - Python MySQLdb vs mysql-connector query performance:
https://charlesnagy.info/it/python/python-mysqldb-vs-mysql-connector-query-performance

FAQ:
https://stackoverflow.com/questions/43102442/whats-the-difference-between-mysqldb-mysqlclient-and-mysql-connector-python

You probably are better off using MySQLdb instead of using this module
directly. In general, renaming goes from mysql_* to _mysql.*. _mysql.connect()
returns a connection object (MYSQL).
Functions which expect MYSQL * as an argument are now methods of the connection
object. A number of things return result objects (MYSQL_RES).
Functions which expect MYSQL_RES * as an argument are now methods of the result
object. Deprecated functions (as of 3.23) are NOT implemented.
"""
import sqlite3
import traceback

from app.connections.errors import ExecuteQueryFailed, InsertFailed


class SqliteModelConnection:  # pragma: no cover
    """Sqlite3 Connection Class."""

    _table = str()

    def __init__(self, **kwargs):
        """Construtor de classe."""
        self.database = kwargs.get("database")
        self.conn = sqlite3.connect(database=self.database)
        self.cursor = self.conn.cursor

        sql_file = open("database.sql")
        sql_as_string = sql_file.read()
        self.conn.executescript(sql_as_string)

    def commit(self):
        """
        Commitar uma transação.

        :return:
        """
        if self.conn is not None:
            return self.conn.commit()

        return False

    def close(self):
        """Fechar conexão."""
        self.conn.close()

    def query(self, sql: str, params=()):
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(sql)

        except Exception as error:
            raise ExecuteQueryFailed from error

        return self.cursor

    def insert_fields(self, table: str, columns_insert: tuple, values_insert: list):
        """
        Insere um registro parcialmente.

        :param table:
        :param columns_insert: tuple e.g ("column1", "column2", "column2", ...)
        :param values_insert : list e.g [(value1, value2, value3), (value1, value2, value3), ...]
        :return:
        """
        try:
            columns, values = self._serialize_insert_fields(columns_insert, values_insert)

            sql = "INSERT INTO %s (%s) VALUES %s" % (table, columns, values)

            cursor = self.query(sql)

        except Exception as error:
            raise error

        return cursor.lastrowid

    def select(
            self,
            table: str,
            fields=(),
            distinct=False,
            where=None,
            group=None,
            order=None,
            limit=None,
    ):
        """
        Executa um select baseado nos parametros enviados.

        :param table: str
        :param fields: tuple
        :param distinct: bool. Default is False
        :param where: tuple
        :param group:
        :param order:
        :param limit:
        :return:
        """
        if limit is None:
            limit = [1000]

        if distinct:
            sql = "SELECT DISTINCT {} FROM {} ".format(fields, table)
        else:
            sql = "SELECT {} FROM {} ".format(fields, table)

        # where conditions
        if where and len(where) > 0:
            sql += " WHERE %s" % where[0]

        if group:
            sql += " GROUP BY %s" % group[0]

        # order
        if order:
            sql += " ORDER BY %s" % order[0]

            if len(order) > 1:
                sql += " %s" % order[1]

        # limit
        if limit:
            sql += " LIMIT %s" % limit[0]

            if len(limit) > 1:
                sql += ", %s" % limit[1]

        return self.query(sql)

    @staticmethod
    def _serialize_insert_fields(columns: tuple, values: list):
        """
        Formatar valores de dicionário do insert em strings.

        :return: columns, values
        """
        columns_str = ", ".join(columns)
        values_str = ""
        for value in values:
            values_str += "(%s)" % ", ".join(["'%s'" % x for x in value])
        return columns_str, values_str
