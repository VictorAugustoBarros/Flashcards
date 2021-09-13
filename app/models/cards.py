from tkinter import *


class Cards:
    def __init__(self, main_frame, text_jp: str, text_br: str):
        self.main_frame = main_frame
        self.text_jp = text_jp
        self.text_br = text_br

        self.button_text = None
        self.canvas = None

    def create_card(self):
        self.canvas = Canvas(self.main_frame, width=300, height=300)
        self.canvas.pack()

        self.canvas.create_rectangle(0, 0, 100, 30, fill="grey40", outline="grey60")
        self.button_text = self.canvas.create_text(50, 15, text=self.text_jp)
        self.canvas.tag_bind(self.button_text, "<Button-1>", self.click)

    def click(self, event):
        self.canvas.itemconfig(self.button_text, text=self.text_br)
