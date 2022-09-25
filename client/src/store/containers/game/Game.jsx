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
    <section className="game__container">
      <div className="game__background">
        <img
          src={game.background_image ? game.background_image : DEFAULT_IMG}
          alt={`${game.name} game image`}
          className="game__background"
        />
        <div className="game__background game__background-filter1" />
        <div className="game__background game__background-filter2" />
      </div>
      <div className="game__bottom">
        <div className="container game__info">
          <div className="game__info-space" />
          <h1 className="game__title">{game.name}</h1>
          <div className="game__genres">
            {game.genres.map(({ id, name }) => (
              <small key={`game_genre-${id}`}>{name}</small>
            ))}
          </div>
          <small className="released">{game.released}</small>
          <small className="rating">{`Rating: ${game.rating}`}</small>
          <div className="game__info-spacer" />
          <div
            className="game__description"
            dangerouslySetInnerHTML={{ __html: game.description }}
          />
          <div className="game__info-space" />
        </div>
      </div>
    </section>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Game;
