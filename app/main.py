"""Main."""
import click
from app.views.main_view import MainView
from start import Start_Window

from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import QApplication
import sys


@click.command()
def run():
    """Função de start do processo."""
    start_view = MainView()
    start_view.mainloop()


def run_teste():
    class ExampleApp(QtWidgets.QMainWindow, Start_Window):
        def __init__(self, parent=None):
            super(ExampleApp, self).__init__(parent)
            self.setupUi(self)

    app = QApplication(sys.argv)
    form = ExampleApp()
    form.show()
    app.exec_()


if __name__ == "__main__":
    run_teste()
