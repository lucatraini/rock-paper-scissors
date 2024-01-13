from flask import Flask, request, jsonify
import random
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client.game_db  # Create a database called 'game_db'
games = db.games     # Create a collection called 'games'

@app.route('/random_choice', methods=['POST'])
def random_choice():
    data = request.get_json()
    choices = ["rock", "paper", "scissors"]

    no_round = data['no_round']
    seed = data['seed']

    random.seed(seed)
    idx = [random.randrange(3) for _ in range(no_round + 1)][-1]

    return jsonify(choice=choices[idx])

#  route for store_game
@app.route('/store_game', methods=['POST'])
def store_game():
    data = request.get_json()
    games.insert_one(data)
    return jsonify(success=True)

@app.route('/games', methods=['GET'])
def get_games():
    games_list = [game for game in games.find()]
    return jsonify(games_list)




if __name__ == '__main__':
    app.run(debug=True, port=8000)