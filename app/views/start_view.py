"""Start View."""
from app.views.cards_view import CardsView
from app.views.import_cards_view import ImportCardsView
import tkinter as tk


class StartView(tk.Frame):
    """Classe Start View."""

    def __init__(self, master):
        """Construtor da classe.

        Args:
            master ():
        """
        tk.Frame.__init__(self, master)
        self.create_interface()

    def create_interface(self):
        """Construção da interface da tela de inicio."""
        label = tk.Label(self, text="Japanese Cards")
        label.config(font=("Courier", 14))
        label.pack()

        button_import_words = tk.Button(
            self, text="Import Words", command=lambda: self.master.switch_frame(ImportCardsView)
        )
        button_import_words.pack()

        button_insert_card = tk.Button(self, text="Insert new Card")
        button_insert_card.pack()

        button_start = tk.Button(self, text="Start", command=lambda: self.master.switch_frame(CardsView))
        button_start.pack()
