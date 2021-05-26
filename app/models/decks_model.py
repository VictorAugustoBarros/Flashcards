from app.models.model import Model


class DecksModel(Model):
    """Classe de modelo da tabela Decks."""

    _table = "decks"
    _pk = "id_deck"

    id_deck = int()
    nm_deck = str()

    def show_decks(self):
        all_decks = {}
        decks = self.fetch_all(table=self._table)
        for deck in decks:
            id_deck = deck[0]
            nm_deck = deck[1]
            all_decks[id_deck] = nm_deck

        return all_decks

    def insert_new_deck(self, deck_names: list):
        result = self._insert_fields(columns=("nm_deck",), values=deck_names)
        if result:
            return True
        return False
