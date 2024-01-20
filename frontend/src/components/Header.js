import React from "react";

const Header = ({ score, houseScore }) => {
  return (
    <div className="header">
      <div className="text">
        <span>Sasso</span>
        <span>Carta</span>
        <span>Forbici</span>
      </div>
      <div className="score-box">
        <span>Punteggio Giocatore</span>
        <div className="score-box__score">{score}</div>
      </div>
      <div className="score-box">
        <span>Punteggio Computer</span>
        <div className="score-box__score">{houseScore}</div>
      </div>
    </div>
  );
};

export default Header;
