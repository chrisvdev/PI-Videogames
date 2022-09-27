import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./gameCard.css";
import DEFAULT_IMG from "../../../assets/game.jpg";

const GameCard = ({ game }) => {
  const { id, name, genres, background_image } = game;
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/games/game/${id}`);
  };
  return (
    <article
      key={`gameCard-${id}`}
      className="gameCard"
      style={genres ? {} : { height: "fit-content" }}
      onClick={onClickHandler}
    >
      {genres && (
        <div className="gameCard__imgContainer" onClick={onClickHandler}>
          <img
            src={background_image ? background_image : DEFAULT_IMG}
            alt={`${name}`}
            onClick={onClickHandler}
          />
        </div>
      )}
      <h2 className="gameCard__title-text" onClick={onClickHandler}>
        {name}
      </h2>
      <div className="gameCard__attributes" onClick={onClickHandler}>
        {genres &&
          genres.map(({ id: genreId, name }) => (
            <div className="gameCard__attribute" onClick={onClickHandler}>
              <small
                key={`game-${id}_genre-${genreId}`}
                className="gameCard__genre"
                onClick={onClickHandler}
              >
                {name}
              </small>
            </div>
          ))}
      </div>
    </article>
  );
};

export default GameCard;
