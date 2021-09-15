"""Main View."""
import tkinter as tk
from app.views.start_view import StartView


class MainView(tk.Tk):
    """Classe Principal View."""

    def __init__(self):
        """Construtor da classe."""
        tk.Tk.__init__(self)
        self._frame = None
        self.switch_frame(frame_class=StartView)

    def switch_frame(self, frame_class=None):
        """Destroi o frame atual e substitui por um novo.

        Args:
            frame_class ():
        """
        if not frame_class:
            self.switch_frame(frame_class=StartView)
        else:
            new_frame = frame_class(self)
            if self._frame is not None:
                self._frame.destroy()
            self._frame = new_frame
            self._frame.pack()
