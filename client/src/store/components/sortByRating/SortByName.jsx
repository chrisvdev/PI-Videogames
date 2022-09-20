import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRatingSort, sortByRating } from "../../api";
import "sortByName.css";

const SortByName = () => {
  const rating = useSelector(selectRatingSort);
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn--source"
      onClick={() =>
        rating
          ? rating === -1
            ? dispatch(sortByRating(1))
            : dispatch(sortByRating(null))
          : dispatch(sortByRating(-1))
      }
    >
      {rating ? (rating === -1 ? "Ascendent" : "Descendent") : "All"}
    </button>
  );
};

export default SortByName;
