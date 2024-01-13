import React, { useState } from "react";
import Header from "./components/Header";
import User from "./components/User";
import Play from "./components/Play";
import Game from "./components/Game";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});
  const [myChoice, setMyChoice] = useState("");
  const [score, setScore] = useState(0);
  const [thinkTimes, setThinkTimes] = useState([]);
  
  const [results, setResults] = useState([]);
  const [myChoices, setMyChoices] = useState([]);
  const [houseChoices, setHouseChoices] = useState([]);

  return (
    <>
      <div className="container">
        <Header score={score} />
        <Routes>
          <Route path="/" element={<User user={user} setUser={setUser} />} />
          <Route path="/play" element={<Play setMyChoice={setMyChoice} thinkTimes={thinkTimes} setThinkTimes={setThinkTimes} />} />
          <Route
            path="/game"
            element={
              <Game myChoice={myChoice} score={score} setScore={setScore} user={user} setUser={setUser}
              results={results} setResults={setResults} myChoices={myChoices} setMyChoices={setMyChoices}
              houseChoices={houseChoices} setHouseChoices={setHouseChoices} thinkTimes={thinkTimes} setThinkTimes={setThinkTimes}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
