import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameById, selectGame, startGame } from "../../api";
import DEFAULT_IMG from "../../../assets/game.jpg";
import "./game.css";

const Game = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useSelector(selectGame);
  useEffect(() => {
    dispatch(startGame());
  }, [id]);
  useEffect(() => {
    (game.noGame || game.rejected) && dispatch(getGameById(id));
  }, [game]);

  return !(game.noGame || game.loading) ? (
    <section className="game__container">
      <div className="game__background">
        <img
          src={game.background_image ? game.background_image : DEFAULT_IMG}
          alt={`${game.name}`}
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
            {game &&
              game.genres &&
              game.genres[0] &&
              game.genres[0].id &&
              game.genres.map(({ id, name }) => (
                <small key={`game_genre-${id}`}>{name}</small>
              ))}
          </div>
          <div className="game__platforms">
            {game &&
              game.parent_platforms &&
              game.parent_platforms[0] &&
              game.parent_platforms[0].platform &&
              game.parent_platforms[0].platform.id &&
              game.parent_platforms.map(({ platform }) => (
                <small
                  key={`game_platform-${platform.id}`}
                  className="platform"
                >
                  {platform.name}
                </small>
              ))}
          </div>
          {game.released && <small className="released">{game.released}</small>}
          {game.rating !== undefined && game.rating !== null && (
            <small className="rating">{`Rating: ${game.rating}`}</small>
          )}
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
    <section className="container">
      <h1>Loading...</h1>
    </section>
  );
};

export default Game;
