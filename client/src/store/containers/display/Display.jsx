import React, { useEffect, useState } from "react";
import SortByRating from "../../components/sortByRating/SortByRating";
import SortByName from "../../components/sortByName/SortByName";
import SelectSource from "../../components/selectSource/SelectSource";
import SelectGenre from "../../components/selectGenre/SelectGenre";
import GameCard from "../../components/gameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import {
  display,
  getGames,
  getGamesByName,
  selectDisplay,
  selectGames,
  start,
} from "../../api";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./display.css";
import { useParams } from "react-router-dom";

const Display = ({  gamesToDisplay = 15 }) => {
  const {toSearch} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(start());
  }, []);
  const games = useSelector(selectGames);
  useEffect(() => {
    (games[0].start || games[0].rejected) &&
      (toSearch ? dispatch(getGamesByName(toSearch)) : dispatch(getGames()));
  }, [games]);
  const [page, setPage] = useState(1);
  const displayToShow = useSelector(selectDisplay);
  useEffect(() => {
    displayToShow[0].toBeFilled &&
      (() => {
        setPage(1);
        dispatch(display());
      })();
  }, [displayToShow]);
  return (
    <section className="container container__display">
      <div
        className="container__display-controller"
        style={toSearch ? { display: "none" } : {}}
      >
        <div className="display-controller__controls">
          <SortByRating />
          <SortByName />
          <SelectSource />
          <SelectGenre />
        </div>
        <div className="display-controller__pager">
          <button
            className="btn display-controller-btn"
            style={page - 1 === 0 ? { display: "none" } : {}}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <IoIosArrowBack />
          </button>
          <small
            className="display-controller-page"
            style={
              displayToShow.length <= gamesToDisplay ? { display: "none" } : {}
            }
          >
            {page}
          </small>
          <button
            className="btn display-controller-btn"
            style={
              page < Math.ceil(displayToShow.length / gamesToDisplay)
                ? {}
                : { display: "none" }
            }
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <section className="container__display-gamesList">
        {displayToShow[0].id &&
          displayToShow
            .slice(gamesToDisplay * (page - 1), gamesToDisplay * page)
            .map((game) => (
              <GameCard key={`gameCard_${game.id}`} game={game} />
            ))}
      </section>
    </section>
  );
};

export default Display;
