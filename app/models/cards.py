"""Cards Model."""


class Cards:
    """Classe Model dos Cards."""

    def __init__(self, canvas, text_jp: str, text_br: str):
        """Construtor da classe.

        Args:
            canvas ():
            text_jp (str): Palavra em Japonês
            text_br (str): Palavra em Português
        """
        self.canvas = canvas
        self.text_jp = text_jp
        self.text_br = text_br
        self.button_text = None
        self.card_ptbr = False

    def create_card(self):
        """Criação do Card na tela."""
        self.canvas.create_rectangle(0, 550, 500, 450, fill="grey40", outline="grey60")
        self.button_text = self.canvas.create_text(250, 500, text=self.text_jp, font=("Arial", 30))
        self.canvas.tag_bind(self.button_text, "<Button-1>", self.click)

    def click(self, event):
        """Função para virar o card com a tradução do texto.

        Args:
            event ():
        """
        if self.card_ptbr:
            self.canvas.itemconfig(self.button_text, text=self.text_jp)
            self.card_ptbr = False
        else:
            self.canvas.itemconfig(self.button_text, text=self.text_br)
            self.card_ptbr = True
