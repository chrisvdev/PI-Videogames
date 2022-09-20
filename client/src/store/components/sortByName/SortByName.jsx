import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNameSort, sortByName } from "../../api";
import "sortByName.css";

const SortByName = () => {
  const nameSort = useSelector(selectNameSort);
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn--name"
      onClick={() =>
        nameSort
          ? nameSort === -1
            ? dispatch(sortByName(1))
            : dispatch(sortByName(null))
          : dispatch(sortByName(-1))
      }
    >
      {nameSort ? (nameSort === -1 ? "Ascendent " : "Descendent ") : ""}
      Names
    </button>
  );
};

export default SortByName;
