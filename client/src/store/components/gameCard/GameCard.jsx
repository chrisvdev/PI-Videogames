import React from "react";
import { Link } from "react-router-dom";
import "./gameCard.css";
import DEFAULT_IMG from "../../../assets/game.jpg";

const GameCard = ({ game }) => {
  const { id, name, rating, genres, background_image } = game;
  return (
    <article className="gameCard">
      {genres && (
        <div className="gameCard__imgContainer">
          <img
            src={background_image ? background_image : DEFAULT_IMG}
            alt={`${name} game image`}
          />
        </div>
      )}
      <div className="gameCard__title">
        <Link to={`/game/${id}`} className="gameCard__title-text">
          {name}
        </Link>
      </div>
      {rating && (
        <div className="gameCard__rating">
          <small className="gameCard__rating-text">{`${rating} points of Rating`}</small>
        </div>
      )}
      {genres && (
        <div className="gameCard__genres">
          {genres.map(({ id: genreId, name }) => (
            <small
              key={`game-${id}_genre-${genreId}`}
              className="gameCard__genre"
            >
              {name}
            </small>
          ))}
        </div>
      )}
    </article>
  );
};

export default GameCard;
