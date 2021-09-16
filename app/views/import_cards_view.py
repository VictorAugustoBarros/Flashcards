"""Import Cards View."""
import time
import tkinter as tk
from tkinter.ttk import *
from tkinter.filedialog import askopenfile
from app.controllers.image_reader import ImageReader
from app.connections.mongodb import Mongodb


class ImportCardsView(tk.Frame):
    """Classe Cards View."""

    def __init__(self, master):
        """Construtor da classe.

        Args:
            master ():
        """
        tk.Frame.__init__(self, master)
        self.progress_bar = None
        self.create_interface()

    def open_file(self):
        file_path = askopenfile(mode="r", filetypes=[("Image Files", "*jpeg"), ("Image Files", "*jpg")])
        if file_path is not None:
            pass

        image_reder = ImageReader(url_image=file_path.name)
        text = image_reder.read_image()

        self.progress_bar = Progressbar(self, orient=tk.HORIZONTAL, length=300, mode="determinate")
        self.progress_bar.grid(row=4, columnspan=3, pady=20)

        words = image_reder.read_text(text=text)
        self.uploadFiles()

        label = tk.Label(self, text="Portuguese", font=("Arial", 16, "bold"))
        label.grid(row=5, column=0)
        label = tk.Label(self, text="Japanese", font=("Arial", 16, "bold"))
        label.grid(row=5, column=1)
        label = tk.Label(self, text="Japanese Write", font=("Arial", 16, "bold"))
        label.grid(row=5, column=2)

        self.create_table(total_rows=len(words), total_columns=3, words=words, row=6)

        mongo_db = Mongodb()
        mongo_db.insert_unique(collection="words", values=words)

        return words

    def create_table(self, total_rows: int, total_columns: int, words: list, row: int):
        for i in range(0, total_rows):
            j = 0
            for j in range(total_columns):
                register = Entry(self, width=50, font=("Arial", 16, "bold"))
                register.grid(row=row, column=j)
                j = "pt" if j == 0 else j
                j = "jp" if j == 1 else j
                j = "jp_write" if j == 2 else j
                register.insert(tk.END, words[i][j])

            row += 1

        return row

    def create_interface(self):
        """Construção da view com seus componentes."""
        adharbtn = Button(self, text="Import Image", command=lambda: self.open_file())
        adharbtn.grid(row=0, column=1)

        button_menu = tk.Button(self, text="Menu", command=lambda: self.master.switch_frame())
        button_menu.grid(row=0, column=2)

    def uploadFiles(self):
        for i in range(5):
            self.update_idletasks()
            self.progress_bar["value"] += 20
            time.sleep(1)
        self.progress_bar.destroy()
        Label(self, text="File Uploaded Successfully!", foreground="green").grid(row=4, columnspan=3, pady=10)
