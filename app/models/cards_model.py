from app.models.model import Model


class CardsModel(Model):
    """Classe de modelo da tabela Decks."""

    _table = "cards"
    _pk = "id_card"

    id_card = int()
    word_jp = str()
    word_br = str()

    def show_cards(self):
        all_cards = {}
        cards = self.fetch_all(table=self._table)
        for card in cards:
            id_card = card[0]
            word_jp = card[1]
            word_br = card[2]
            all_cards[id_card] = {
                "jp": word_jp,
                "br": word_br
            }

        return all_cards

    def insert_new_card(self, word_jp: str, word_br: str):
        result = self._insert_fields(columns=("word_jp", "word_br"), values=[(word_jp, word_br)])
        if result:
            return True
        return False
