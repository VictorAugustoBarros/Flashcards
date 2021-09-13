from app.connections.sqlite_conn import SqliteConn
from app.models.cards_model import CardsModel
from app.models.application import Application

sqlite_conn = SqliteConn()

cards_model = CardsModel(sqlite_conn=sqlite_conn)
cards_model.insert_new_card(word_jp="ネコ", word_br="Gato")
cards_model.insert_new_card(word_jp="ネコ", word_br="Gato")

all_cards = cards_model.show_cards()

application = Application(cards=all_cards)

application.root.mainloop()
