import os
import pytz

from flask import Flask, request, jsonify, Response
import random
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd

from encoding import encode

FLASK_HOST = os.environ.get('FLASK_HOST')
MONGO_HOST = os.environ.get('MONGO_HOST')

app = Flask(__name__)
CORS(app)

client = MongoClient(f'mongodb://{MONGO_HOST}:27017/')
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

@app.route('/download', methods=['GET'])
def get_games():
    data = []
    for game in games.find():
        no_rounds = len(game['myChoices'])
        print(game)
        for i in range(no_rounds):
            j = i+1
            game[f"S{j}"] = game['myChoices'][i]
            game[f"C{j}"] = game['houseChoices'][i]
            game[f"R{j}"] = game['results'][i]
            game[f"T{j}"] = game['thinkTimes'][i]
        del game['myChoices']
        del game['houseChoices']
        del game['results']
        del game['thinkTimes']

        data.append(game)
    
    df = pd.DataFrame(data)

    if 'encode' in request.args:
        encode(df)

    df.rename(columns={"_id": "Timestamp",
                       "id": "ID",
                       "sesso":"Sesso",
                       "eta": "Età",
                       "scolarita": "Scolarità"}, inplace=True)
    
    # generate date column from timestamp
    dates = pd.to_datetime(df['Timestamp'], unit='ms')
    df.insert(loc=1, column='Inizio', value=dates)
    cest = pytz.timezone('Europe/Berlin')
    df['Inizio'] = df['Inizio'].dt.tz_localize('UTC').dt.tz_convert(cest)

    csv = df.to_csv(index=False)


    return Response(csv,
                    mimetype="text/csv",
                    headers={"Content-Disposition": "attachment;filename=my_data.csv"})





if __name__ == '__main__':
    app.run(host=FLASK_HOST, port=8000)