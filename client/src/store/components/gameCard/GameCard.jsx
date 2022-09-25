import React from "react";
import { Link } from "react-router-dom";
import "./gameCard.css";
import DEFAULT_IMG from "../../../assets/game.jpg";

const GameCard = ({ game }) => {
  const { id, name, rating, genres, background_image } = game;
  return (
    <article
      className="gameCard"
      style={genres ? {} : { height: "fit-content" }}
    >
      {genres && (
        <div className="gameCard__imgContainer">
          <img
            src={background_image ? background_image : DEFAULT_IMG}
            alt={`${name} game image`}
          />
        </div>
      )}
      <Link to={`/games/game/${id}`} className="gameCard__title">
        <h2 className="gameCard__title-text">{name}</h2>
      </Link>
      <div className="gameCard__attributes">
        {rating && (
          <div className="gameCard__attribute">
            <small className="rating">{`Rating: ${rating}`}</small>
          </div>
        )}
        {genres &&
          genres.map(({ id: genreId, name }) => (
            <div className="gameCard__attribute">
              <small
                key={`game-${id}_genre-${genreId}`}
                className="gameCard__genre"
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
