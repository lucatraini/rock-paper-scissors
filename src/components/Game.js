import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const Game = ({ score, myChoice, setScore, user, setUser, results, setResults, myChoices, setMyChoices, houseChoices, setHouseChoices}) => {
  const no_rounds = 3;

  const [house, setHouse] = useState("");
  const [playerWin, setPlayerWin] = useState("");

  const [counter, setCounter] = useState(3);

  const newHousePick = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        no_round: myChoices.length + 1,
        seed: user._id, 
      }),
    };
    
    fetch('http://localhost:8000/random_choice', requestOptions) 
      .then(response => response.json())
      .then(data => setHouse(data.choice))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    newHousePick();
  }, []);

  const Result = () => {
    setMyChoices([...myChoices, myChoice]);
    setHouseChoices([...houseChoices, house]);
    if (myChoice === "rock" && house === "scissors") {
      res = "win";
      setScore(score + 1);
    } else if (myChoice === "rock" && house === "paper") {
      res = "lose";
      setScore(score - 1);
    } else if (myChoice === "scissors" && house === "paper") {
      res = "win";
      setScore(score + 1);
    } else if (myChoice === "scissors" && house === "rock") {
      res = "lose";
      setScore(score - 1);
    } else if (myChoice === "paper" && house === "rock") {
      res = "win";
      setScore(score + 1);
    } else if (myChoice === "paper" && house === "scissors") {
      res = "lose";
      setScore(score - 1);
    } else {
      res = "draw";
    }
    setPlayerWin(res);
    setResults([...results, res]);
  };

  const reset = () => {
    setHouse("");
    setPlayerWin("");

    game = {...user, results: results, myChoices: myChoices, houseChoices: houseChoices};

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    };
    
    fetch('http://localhost:8000/store_game', requestOptions) 
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => {
        setResults([]);
        setMyChoices([]);
        setHouseChoices([]);
        setUser({});
        setScore(0);})
      .catch(error => console.error('Error:', error));

  }

  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => {
            setCounter(counter - 1);
          }, 1000)
        : Result();

    return () => {
      clearInterval(timer);
    };
  }, [counter, house]);

  return (
    <div className="game">
      <div className="game__you">
        <span className="text">You Picked</span>
        <div
          className={`icon icon--${myChoice} ${
            playerWin == "win" ? `icon icon--${myChoice}--winner` : ""
          }`}
        ></div>
      </div>
      {playerWin == "win" &&  myChoices.length  < no_rounds && (
        <div className="game__play">
          <span className="text">You Win</span>
          <Link to="/play" className="play-again" onClick={() => setHouse()}>
            Play Again
          </Link>
        </div>
      )}
      {playerWin == "lose" && myChoices.length  < no_rounds && (
        <div className="game__play">
          <span className="text">You Lose</span>
          <Link to="/play" className="play-again" onClick={() => setHouse()}>
            Play Again
          </Link>
        </div>
      )}
      {playerWin == "draw" && myChoices.length  < no_rounds && (
        <div className="game__play">
          <span className="text">Draw</span>
          <Link to="/play" className="play-again" onClick={() => setHouse()}>
            Play Again
          </Link>
        </div>
      )}

      {playerWin == "win" &&  myChoices.length  >= no_rounds && (
        <div className="game__play">
          <span className="text">You Win</span>
          <Link to="/" className="play-again" onClick={reset}>
            Finito
          </Link>
        </div>
      )}
      {playerWin == "lose" && myChoices.length  >= no_rounds && (
        <div className="game__play">
          <span className="text">You Lose</span>
          <Link to="/" className="play-again" onClick={reset}>
            Finito
          </Link>
        </div>
      )}
      {playerWin == "draw" && myChoices.length >= no_rounds && (
        <div className="game__play">
          <span className="text">Draw</span>
          <Link to="/" className="play-again" onClick={reset}>
            Finito
          </Link>
        </div>
      )}

      <div className="game__house">
        <span className="text">The House Picked</span>
        {counter == 0 ? (
          <div
            className={`icon icon--${house} ${
              playerWin == "lose" ? `icon icon--${house}--winner` : ""
            }`}
          ></div>
        ) : (
          <div className="counter">{counter}</div>
        )}
      </div>
    </div>
  );
};

export default Game;

/*
 my choice:{myChoice} <br />
      House choice:{house} <br />
      Result:
      {playerWin == "win" && <h2>You Win</h2>}
      {playerWin == "lose" && <h2>You lose</h2>}
      {playerWin == "draw" && <h2>Draw</h2>}
      <Link to="/play" onClick={() => setHouse()}>
        Play Again
      </Link>

*/
