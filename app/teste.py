import sqlite3
from app.connections.sqlite_conn import SqliteConn
from app.models.decks_model import DecksModel

sqlite_conn = SqliteConn()

decks = DecksModel(sqlite_conn=sqlite_conn)
decks.insert_new_deck(deck_names=["deck1", "deck2"])

all_decks = decks.show_decks()
print(all_decks)
