import React, { useState } from "react";
import Modal from "./Modal";
const Footer = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <footer className="footer">
        <div className="attribution">
          Adattamento di {" "}
          <a href="https://github.com/codebucks27/ReactJs-rock-paper-scissors-game" target="_blank">
          rock-paper-scissors
          </a>
           sviluppato da <a href="https://youtube.com/codebucks" target="_blank">CodeBucks</a>.
        </div>
        <button className="rules" onClick={toggle}>
          Regole
        </button>
      </footer>
      {modal ? <Modal toggle={toggle} /> : null}
    </>
  );
};

export default Footer;
