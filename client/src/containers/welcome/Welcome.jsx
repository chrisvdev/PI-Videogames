import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  return <section className="container welcome__container">
    <Link to={"/games"} className="btn welcome__btn">Enter</Link>
  </section>;
};

export default Welcome;
