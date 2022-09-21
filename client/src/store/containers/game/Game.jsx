import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameById, selectGame } from "../../api";
import DEFAULT_IMG from "../../../assets/game.jpg";
import "./game.css";

const Game = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useSelector(selectGame);
  useEffect(() => {
    (game.noGame || game.rejected) && dispatch(getGameById(id));
  }, [game]);

  return !(game.noGame || game.loading) ? (
    <section className="container game__container">
      <div className="game__image-background">
        <img
          src={game.background_image ? game.background_image : DEFAULT_IMG}
          alt={`${game.name} game image`}
        />
      </div>
      <div className="game__info">
        <h1 className="game__title">{game.name}</h1>
        <small className="game__released">{game.released}</small>
        <small className="game__rating">{`${game.rating} points of Rating`}</small>
        <div className="game__genres">
          {game.genres.map(({ id, name }) => (
            <small key={`game_genre-${id}`}>{name}</small>
          ))}
        </div>
        <div
          className="game__description"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </div>
    </section>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Game;
