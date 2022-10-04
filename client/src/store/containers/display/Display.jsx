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
  selectDisplay,
  selectGames,
} from "../../api";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./display.css";

const Display = ({ gamesToDisplay = 15 }) => {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  useEffect(() => {
    games &&
      games[0] &&
      (games[0].start || games[0].rejected) &&
      dispatch(getGames());
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
  const lastPage = Math.ceil(displayToShow.length / gamesToDisplay);

  const DisplayController = () => {
    return (
      <>
        <div
          className="display__controller"
        >
          <SortByRating />
          <SortByName />
          <SelectSource />
          <SelectGenre />
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
                displayToShow.length <= gamesToDisplay
                  ? { display: "none" }
                  : {}
              }
            >
              {`Page ${page} of ${lastPage}`}
            </p>
            <button
              className="btn display__controller-btn"
              style={
                page < lastPage
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
      </>
    );
  };

  const DisplayData = () => {
    return (
      <>
        <section className="display__gamesList">
          {displayToShow
            .slice(gamesToDisplay * (page - 1), gamesToDisplay * page)
            .map((game) => (
              <GameCard key={`gameCard_${game.id}`} game={game} />
            ))}
        </section>
      </>
    );
  };

  return (
    <section className="container display__container">
      <DisplayController />
      {displayToShow &&
        displayToShow[0] &&
        ((displayToShow[0].idle && <h1>Waiting for data...</h1>) ||
          (!(displayToShow[0].toBeFilled === undefined) &&
            (displayToShow[0].toBeFilled ? (
              <h1>Preparing data!</h1>
            ) : (
              <h1>Nothing to show...</h1>
            ))) ||
          (displayToShow[0].id && <DisplayData />) || (
            <h1>Something went wrong 😔</h1>
          ))}
    </section>
  );
};

export default Display;
