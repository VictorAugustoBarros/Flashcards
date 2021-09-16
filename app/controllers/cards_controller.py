"""Cards Controller."""
import tkinter.messagebox

from app.connections.mongodb import Mongodb
from app.models.tables.cards_models import CardsModel
from app.models.cards import Cards
import random


class CardsController:
    """Classe para controle dos Cards."""

    def __init__(self, mongodb: Mongodb, canvas):
        """Construtor da classe.

        Args:
            canvas ():
        """
        self.mongodb = mongodb
        self.canvas = canvas

        self.previous_card = None
        self.current_card = 0
        self.next_card = 1

        self.cards = self.get_cards()

    def get_cards(self):
        """Busca de todos os cards cadastrados."""
        mongodb = Mongodb()
        cards = mongodb.select_all("words")

        list_cards = []
        for card in cards:
            list_cards.append(card)
        return list_cards

    @staticmethod
    def sort_cards(cards: list):
        """Sorteia os cards de forma aleatória.

        Args:
            cards (list): Lista com os Cards
        """
        return random.sample(cards, len(cards))

    def reset_words(self):
        """Reseta os Cards para reiniciar o fluxo."""
        self.previous_card = None
        self.current_card = 0
        self.next_card = 1
        self.cards = random.sample(self.cards, len(self.cards))
        self.generate_card()

        return self.current_card

    def previous_word(self):
        """Gera o card anterior da lista e atualiza os botões de controle."""
        buttons = {}
        self.previous_card = self.current_card - 1
        self.next_card = self.current_card + 1

        buttons["button_previous"] = "normal"
        buttons["button_next"] = "normal"
        if self.current_card == 1:
            buttons["button_previous"] = "disabled"

        self.current_card -= 1
        self.generate_card()
        return buttons

    def next_word(self):
        """Gera o proximo card da lista e atualiza os botões de controle."""
        buttons = {}
        self.previous_card = self.current_card - 1
        self.next_card = self.current_card + 1

        if self.next_card == len(self.cards):
            tkinter.messagebox.showinfo(title="Cards", message="Parabéns, cards finalizados.")
            buttons["button_previous"] = "normal"
            buttons["button_next"] = "disabled"
            return buttons

        else:
            buttons["button_previous"] = "normal"
            buttons["button_next"] = "normal"

        self.current_card += 1
        self.generate_card()

        return buttons

    def get_current_card(self):
        """Busca o Card atual a ser gerado."""
        return self.cards[self.current_card]

    def generate_card(self):
        """Geração do Card Atual."""
        card = self.get_current_card()
        card_model = Cards(canvas=self.canvas, text_jp=card.get("jp_write"), text_br=card.get("pt"))
        card_model.create_card()
