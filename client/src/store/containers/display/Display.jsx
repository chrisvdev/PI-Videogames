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

const Display = ({ gamesToDisplay = 15 }) => {
  const { toSearch } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(start());
  }, []);
  useEffect(() => {
    dispatch(start());
  }, [toSearch]);
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
  return displayToShow[0].id ? (
    <section className="container display__container">
      <div
        className="display__controller"
        style={toSearch ? { display: "none" } : {}}
      >
        <div className="display__controller-segment">
          <SortByRating />
          <SortByName />
          <SelectSource />
        </div>
        <div className="display__controller-segment">
          <SelectGenre />
        </div>
        <div className="display__controller-segment display__controller-pager">
          <button
            className="btn display__controller-btn"
            style={page - 1 === 0 ? { display: "none" } : {}}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <IoIosArrowBack />
          </button>
          <p
            className="display__controller-page"
            style={
              displayToShow.length <= gamesToDisplay ? { display: "none" } : {}
            }
          >
            {page}
          </p>
          <button
            className="btn display__controller-btn"
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
      <section className="display__gamesList">
        {displayToShow
          .slice(gamesToDisplay * (page - 1), gamesToDisplay * page)
          .map((game) => (
            <GameCard key={`gameCard_${game.id}`} game={game} />
          ))}
      </section>
    </section>
  ) : (
    <section className="container display__container">
      <h1>Loading...</h1>
    </section>
  );
};

export default Display;
