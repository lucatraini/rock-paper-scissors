from flask import Flask, request, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# @app.route('/random_choice', methods=['GET'])
# def random_choice():
#     choices = ["rock", "paper", "scissors"]
#     return jsonify(choice=random.choice(choices))

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
    print(data)
    return jsonify(success=True)



if __name__ == '__main__':
    app.run(debug=True, port=8000)