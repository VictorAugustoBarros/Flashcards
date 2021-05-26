"""Api."""
from flask import Flask, jsonify
from flask.cli import FlaskGroup
from app.routes.cards_routes import card_routes


def register_blueprints(app: Flask):
    """Função para registrar as diferentes rotas.

    Args:
        app (Flask): app criado pela função create_app.
    """
    with app.app_context():
        app.register_blueprint(card_routes)


def create_app():
    """create_app function."""
    app = Flask(__name__)

    @app.shell_context_processor
    def _shell_context():  # pragma: no cover
        return {"app": app}

    register_blueprints(app)

    @app.route("/", methods=["GET"])
    def _index():
        """Rota principal da api."""
        return jsonify({"status": 200, "message": "api-stevie-provider v1.0"}), 200

    @app.route("/healthcheck", methods=["GET"])
    def _health_check():
        """Função para checar a saúde da api."""
        return jsonify({"msg": "OK"}), 200

    return app


cli = FlaskGroup(create_app=create_app)

if __name__ == "__main__":
    api = create_app()
    api.run(debug=True)
