import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRatingSort, sortByRating } from "../../api";
import "./sortByRating.css";

const SortByRating = () => {
  const rating = useSelector(selectRatingSort);
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn--rating"
      onClick={() =>
        rating
          ? rating === -1
            ? dispatch(sortByRating(1))
            : dispatch(sortByRating(null))
          : dispatch(sortByRating(-1))
      }
    >
      {rating ? (rating === 1 ? "1 to 5 " : "5 to 1 ") : ""}
      Ratings
    </button>
  );
};

export default SortByRating;
