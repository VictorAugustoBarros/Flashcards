"""Main."""
import click
from app.connections.sqlite_conn import SqliteConn
from app.views.main_view import MainView


@click.command()
def run():
    """Função de start do processo."""
    sqlite_conn = SqliteConn()
    sqlite_conn.initialize_db()

    from app.models.tables.cards_models import CardsModel

    cards_model = CardsModel(sqlite_conn=sqlite_conn)
    cards_model.insert_new_card(word_jp="ネコ", word_br="Gato")
    cards_model.insert_new_card(word_jp="コ", word_br="Cachorro")
    cards_model.insert_new_card(word_jp="コネ", word_br="Cobra")
    sqlite_conn.commit()

    start_view = MainView()
    start_view.mainloop()


if __name__ == "__main__":
    run()
