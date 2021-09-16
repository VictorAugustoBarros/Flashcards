"""Main."""
import click
from app.views.main_view import MainView


@click.command()
def run():
    """Função de start do processo."""
    start_view = MainView()
    start_view.mainloop()


if __name__ == "__main__":
    run()
