"""Rotas Stevie Provider."""
from flask import Flask, jsonify, request
from flask import Blueprint


app = Flask(__name__)

card_routes = Blueprint("router", __name__)


@card_routes.route("/rcs/dlr", methods=["POST"])
def insert_new_card():
    pass
