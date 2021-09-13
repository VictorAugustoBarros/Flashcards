import tkinter.messagebox
from tkinter import *
from app.models.cards import Cards


class Application:

    def __init__(self, cards: dict):
        self.start = False
        self.current_card = 1
        self.cards = cards

        self.root = Tk()
        self.root.title("Cards")

        window_width, window_height = 300, 300
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()

        position_top = int(screen_height / 2 - window_height / 2)
        position_right = int(screen_width / 2 - window_width / 2)

        self.root.geometry("%sx%s+%s+%s" % (window_width, window_height, position_right, position_top))

        self.frame_card = Frame(self.root)
        self.frame_card.grid(row=0, column=0, ipady=window_height / 2)

        frame_next = Frame(self.root)
        frame_next.grid(row=10, column=5)

        button_reset = Button(frame_next, text='Reset Words', width=25, command=self.reset_words())
        button_reset.grid(row=0, column=0, padx=window_width / 2)

        button_next = Button(frame_next, text='Next Word', width=25, command=self.next_word)
        button_next.grid(row=0, column=1)

    def validate_start(self):
        if not self.start:
            print("Comecou")

    def reset_words(self):
        self.current_card = 1

    def next_word(self):
        self.validate_start()
        self.start = True

        card = self.get_next_card()
        if card:
            card_model = Cards(main_frame=self.frame_card, text_jp=card.get("jp"), text_br=card.get("br"))
            card_model.create_card()
        else:
            tkinter.messagebox.showinfo("showinfo", "Acabou os Cards")

    def get_next_card(self):
        if self.current_card > len(self.cards):
            return {}

        card_atual = self.cards[self.current_card]
        self.current_card += 1
        return card_atual
