"""Cards View."""
import tkinter as tk
from app.connections.sqlite_conn import SqliteConn
from app.controllers.cards_controller import CardsController


class CardsView(tk.Frame):
    """Classe Cards View."""

    def __init__(self, master):
        """Construtor da classe.

        Args:
            master ():
        """
        tk.Frame.__init__(self, master)

        self.frames = None
        self.canvas = None
        self.buttons = None

        self.create_interface()

        self.cards_controller = CardsController(sqlite_conn=SqliteConn(), canvas=self.canvas)
        self.cards_controller.generate_card()

    def create_interface(self):
        """Construção da view com seus componentes."""
        # Frames
        self.frames = self.create_frames()
        # Canvas
        self.canvas = self.create_canvas(frame=self.frames["card_frame"], width=300, height=900)
        # Buttons
        self.buttons = self.create_buttons(frame=self.frames["buttons_frame"])

    def create_frames(self):
        """Construção dos Frames da tela de Cards."""
        frames = {}
        card_frame = tk.Frame(self)
        card_frame.pack(side=tk.TOP)
        frames["card_frame"] = card_frame

        buttons_frame = tk.Frame(self)
        buttons_frame.pack(side=tk.BOTTOM)
        frames["buttons_frame"] = buttons_frame

        return frames

    def create_canvas(self, frame: tk.Frame, width: int, height: int):
        """Construção do Canvas da tela de Cards para criação dos cards em si.

        Args:
            frame (tk.Frame):
            width (int): Largura do Canvas
            height (int): Altura do Canvas
        """
        canvas = tk.Canvas(frame, width=width, height=height)
        canvas.pack()

        return canvas

    def create_buttons(self, frame: tk.Frame):
        """Construção dos Botões da tela de Cards.

        Args:
            frame ():
        """
        buttons = {}
        button_reset = tk.Button(frame, text="Sort Words", width=15, command=self.reset_words)
        button_reset.grid(row=4, column=1)
        buttons["button_reset"] = button_reset

        button_previous = tk.Button(frame, state="disabled", text="Previous Word", width=15, command=self.previous_word)
        button_previous.grid(row=4, column=3)
        buttons["button_previous"] = button_previous

        button_next = tk.Button(frame, text="Next Word", state="normal", width=15, command=self.next_word)
        button_next.grid(row=4, column=4)
        buttons["button_next"] = button_next

        button_menu = tk.Button(frame, text="Menu", command=lambda: self.master.switch_frame())
        button_menu.grid(row=5, column=3)
        """
        <class 'app.views.start_view.StartView'>
        """
        return buttons

    def reset_words(self):
        """Reseta os cards da lista de forma aleatória e atualiza os botões de controle."""
        self.cards_controller.reset_words()
        self.buttons["button_previous"]["state"] = "disabled"
        self.buttons["button_next"]["state"] = "normal"
        self.buttons["button_reset"]["state"] = "normal"

    def previous_word(self):
        """Gera o card anterior da lista e atualiza os botões de controle."""
        buttons = self.cards_controller.previous_word()
        self.buttons["button_previous"]["state"] = buttons["button_previous"]
        self.buttons["button_next"]["state"] = buttons["button_next"]

    def next_word(self):
        """Gera o proximo card da lista e atualiza os botões de controle."""
        buttons = self.cards_controller.next_word()
        self.buttons["button_previous"]["state"] = buttons["button_previous"]
        self.buttons["button_next"]["state"] = buttons["button_next"]
