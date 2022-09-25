import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  return (
    <section className="container welcome__container">
      <div className="welcome__column">
        <h1 className="welcome__title">The Game Catalog</h1>
        <Link to={"/games"} className="btn welcome__btn">
          Enter
        </Link>
        <div className="welcome__box"/>
      </div>
    </section>
  );
};

export default Welcome;
