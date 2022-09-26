import React from "react";
import {
  SiGithub,
  SiReact,
  SiRedux,
  SiReactrouter,
  SiNodedotjs,
  SiExpress,
  SiSequelize,
  SiPostgresql,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";
import "./about.css";

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="container about__container">
      <button
        className="btn"
        onClick={() => {
          navigate("/games");
        }}
      >
        Go back to the game list...
      </button>
      <div className="about">
        <h1 className="about__title">The Game Catalog</h1>
        <p className="about__text">
          This was madded as a proof of knowledge acquired on the bootcamp of{" "}
          <a href="https://www.soyhenry.com/" className="about__link">
            "Soy Henry"
          </a>{" "}
          by{" "}
          <a href="https://chrisvill2312.github.io/" className="about__link">
            Christian Villegas
          </a>{" "}
          whit the next technologies...
        </p>
        <div className="about__technologies">
          <div className="about__side">
            <h2 className="about__technologies-title">FrontEnd</h2>
            <ul className="about__technologies-list">
              <li className="about__technologies-item">
                <SiReact size={70} />
                <h3>React</h3>
                <div>
                  <small>Version: 18.2.0</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiReact size={70} />
                <h3>React-Icons</h3>
                <div>
                  <small>Version: 4.4.0</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiRedux size={70} />
                <h3>Redux Toolkit</h3>
                <div>
                  <small>Version: 1.8.5</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiRedux size={70} />
                <h3>React-Redux</h3>
                <div>
                  <small>Version: 8.0.2</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiReactrouter size={70} />
                <h3>React-Router</h3>
                <div>
                  <small>Version: 6.4.0</small>
                </div>
              </li>
            </ul>
          </div>
          <div className="about__side">
            <h2 className="about__technologies-title">BackEnd</h2>
            <ul className="about__technologies-list">
              <li className="about__technologies-item">
                <SiNodedotjs size={70} />
                <h3>Node.js</h3>
                <div>
                  <small>Version: 18.9.1</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiExpress size={70} />
                <h3>Express.js</h3>
                <div>
                  <small>Version: 4.17.1</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiSequelize size={70} />
                <h3>Sequelize</h3>
                <div>
                  <small>Version: 6.3.5</small>
                </div>
              </li>
              <li className="about__technologies-item">
                <SiPostgresql size={70} />
                <h3>Postgres</h3>
                <div>
                  <small>Version: 14</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <p className="about__text2">
          You can find the source code of this project on{" "}
          <a
            href="https://github.com/chrisvill2312/PI-Videogames"
            className="about__link"
          >
            <SiGithub /> GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default About;
