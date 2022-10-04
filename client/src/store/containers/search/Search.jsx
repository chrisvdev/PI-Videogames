import React, { useEffect } from "react";
import GameCard from "../../components/gameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getGamesByName,
  selectSearch,
  startSearch,
} from "../../api";
import "./search.css";
import { useParams } from "react-router-dom";

const Display = () => {
  const { toSearch } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    toSearch && dispatch(startSearch());
  }, [toSearch]);
  const search = useSelector(selectSearch);
  useEffect(() => {
    search &&
      search[0] &&
      search[0].start &&
      dispatch(getGamesByName(toSearch));
  }, [search]);

  return (
    <section className="container display__container">
      {search &&
        search[0] &&
        (((search[0].loading || search[0].start) && (
          <h1>Waiting for data...</h1>
        )) ||
          (search[0].id && (
            <section className="display__gamesList">
              {search.map((game) => (
                <GameCard key={`gameCard_${game.id}`} game={game} />
              ))}
            </section>
          )) || <h1>Something went wrong 😔</h1>)}
    </section>
  );
};

export default Display;
