import React, { useEffect, useState } from "react";
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

const Display = ({ toSearch, gamesToDisplay = 15 }) => {
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
    <div className="container container__display">
      <div className="container__display-controller">
        <button
          className="btn display-controller-btn"
          style={page - 1 === 0 ? { display: "none" } : {}}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <IoIosArrowBack />
        </button>
        <small className="display-controller-page">{page}</small>
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
      {displayToShow
        .slice(gamesToDisplay * (page - 1), gamesToDisplay * page)
        .map((game) => (
          <h1>{game.name}</h1>
        ))}
    </div>
  );
};

export default Display;
