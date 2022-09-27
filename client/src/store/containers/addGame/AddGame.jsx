import React, { useState, useEffect } from "react";
import "./addGame.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGenres,
  selectPlatforms,
  getGenres,
  getPlatforms,
} from "../../api";
import isFloat from "validator/es/lib/isFloat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addGame.css";

const AddGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector(selectGenres);
  const parent_platforms = useSelector(selectPlatforms);
  const [game, setGame] = useState({ genres: [], parent_platforms: [] });
  const [error, setError] = useState("");
  const changeHandler = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let error = "";
    (game.name && game.name.length > 0) ||
      (error += "You need to give a name. ");
    (game.description && game.description.length > 0) ||
      (error += "You need to give a description. ");
    game.parent_platforms.length > 0 ||
      (error += "You need to choice almost one platform. ");
    (isFloat(game.rating ? game.rating : "0", { min: 0, max: 5 }) ||
      !(error +=
        "You need to give a valid rating (number between 0.0 to 5.0).")) &&
      error.length === 0 &&
      setGame({ ...game, rating: parseFloat(game.rating) });
    error.length == 0
      ? axios
          .post(`http://${document.domain}/videogames`, game) //:8080 for dev
          .then(() => {
            setError("Game sended! redirecting to games list");
            setTimeout(() => {
              navigate("/games");
            }, 3000);
          })
          .catch((reason) => {
            setError("something went wrong, see the console for more info...");
            console.error(reason);
          })
      : setError(error);
  };
  useEffect(() => {
    genres && genres[0].start && dispatch(getGenres());
  }, [genres]);
  useEffect(() => {
    parent_platforms && parent_platforms[0].start && dispatch(getPlatforms());
  }, [parent_platforms]);
  const listHandler = ({ target }) => {
    setGame({
      ...game,
      [target.className]: game[target.className].find(
        ({ id }) => id === parseInt(target.id)
      )
        ? game[target.className].filter(({ id }) => id !== parseInt(target.id))
        : [
            ...game[target.className],
            { id: parseInt(target.id), name: target.name },
          ],
    });
  };
  return (
    <section className="addGame">
      <div className="addGame__bottom">
        <form
          action=""
          className="container addGame__form"
          onSubmit={submitHandler}
        >
          <div className="addGame__info-space" />
          <h3 className="addGame__title">Create Game</h3>
          <div className="addGame__info-spacer" />
          <input
            value={game.name ? game.name : ""}
            type="text"
            name="name"
            id=""
            className="addGame__text"
            placeholder="Name"
            onChange={changeHandler}
          />
          <textarea
            name="description"
            value={game.description}
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
            onChange={changeHandler}
          />
          <div className="addGame__form-sub">
            <input
              type="date"
              value={game.date}
              name="released"
              id=""
              placeholder="Released"
              onChange={changeHandler}
            />
            <input
              value={game.rating ? game.rating : ""}
              type="text"
              name="rating"
              id=""
              className="addGame__text"
              placeholder="Rating"
              onChange={changeHandler}
            />
          </div>
          <div className="addGame__info-spacer" />
          <div className="addGame__selector">
            <ul className="addGame__selector-list">
              <h2>Genres</h2>
              {genres[0].id &&
                genres.map(({ id, name }) => (
                  <li
                    key={`genre_${id}`}
                    className="addGame__selector-list-option"
                  >
                    <input
                      type="checkbox"
                      name={name}
                      id={id}
                      className="genres"
                      onChange={listHandler}
                    />
                    <label>{name}</label>
                  </li>
                ))}
            </ul>
            <ul className="addGame__selector-list">
              <h2>Platforms</h2>
              {parent_platforms[0].id &&
                parent_platforms.map(({ id, name }) => (
                  <li key={`platform_${id}`}>
                    <div className="addGame__selector-list-option">
                      <input
                        type="checkbox"
                        name={name}
                        id={id}
                        className="parent_platforms"
                        onChange={listHandler}
                      />
                      <label>{name}</label>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="addGame__info-spacer" />
          <input type="submit" className="btn" />
          <div className="addGame__info-space">
            <div className="addGame__info-spacer" />
            {error.length !== 0 && <h2 className="addGame__error">{error}</h2>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddGame;
