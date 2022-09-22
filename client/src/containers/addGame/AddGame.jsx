import React, { useState } from "react";
import "./addGame.css";
import SelectGenre from "../../store/components/selectGenre/SelectGenre";
import SelectPlatform from "../../store/components/selectPlatform/SelectPlatform";
import { useSelector } from "react-redux";
import { selectGenres, selectPlatforms } from "../../store/api";

const AddGame = () => {
  const genres = useSelector(selectGenres);
  const platforms = useSelector(selectPlatforms);
  const [game, setGame] = useState({ genres: [], platforms: [] });
  const changeHandler = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <section className="container addGame__container">
      <form action="" className="addGame__form" onSubmit={submitHandler}>
        <h3 className="addGame__title">Create Game</h3>
        <input
          value={game.name}
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
        <input
          type="date"
          value={game.date}
          name="released"
          id=""
          placeholder="Released"
          onChange={changeHandler}
        />
        <div className="addGame__selector">
          <SelectGenre
            value={game.selectedGenre}
            name="selectedGenre"
            onSelect={changeHandler}
          />
          <button
            className="btn addGame__selector-btn"
            style={
              game.selectedGenre && game.selectedGenre > 0
                ? {}
                : { display: "none" }
            }
            onClick={() => {
              (game.genres.length === 0 ||
                !game.genres.find(({ id }) => id === game.selectedGenre)) &&
                setGame({
                  ...game,
                  genres: [
                    ...game.genres,
                    genres.find(({ id }) => id === game.selectedGenre),
                  ],
                  selectedGenre: 0,
                });
            }}
          >
            Add
          </button>
        </div>
        <div className="addGame__selector">
          <SelectPlatform
            value={game.selectedPlatform}
            name="selectedPlatform"
            onSelect={changeHandler}
          />
          <button
            className="btn addGame__selector-btn"
            style={
              game.selectedPlatform && game.selectedPlatform > 0
                ? {}
                : { display: "none" }
            }
            onClick={() => {
              !game.platforms.find(game.selectedPlatform) &&
                setGame({
                  ...game,
                  platforms: [...game.platforms, game.selectedGenre],
                  selectedGenre: 0,
                });
            }}
          >
            Add
          </button>
        </div>
        <input type="submit" />
        <input type="checkbox" name="hola" id="" placeholder="hola"/>
      </form>
    </section>
  );
};

export default AddGame;
