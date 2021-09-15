"""Card Models."""
from app.models.tables.model import Model


class CardsModel(Model):
    """Classe de modelo da tabela Decks."""

    _table = "cards"
    _pk = "id_card"

    id_card = int()
    word_jp = str()
    word_br = str()

    def get_all_cards(self):
        """Busca de todos os cards inseridos na tabela."""
        return self.fetch_all(table=self._table)

    def insert_new_card(self, word_jp: str, word_br: str):
        """Inserção de um novo card na tabela cards.

        Args:
            word_jp (str): Palavra em Japonês
            word_br (str): Palavra em Portugues
        """
        result = self._insert_fields(columns=("word_jp", "word_br"), values=[(word_jp, word_br)])
        if result:
            return True
        return False
