import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterBySource, selectSourceFilter } from "../../api";
import "./selectSource.css";

const SelectSource = () => {
  const source = useSelector(selectSourceFilter);
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn--source"
      onClick={() =>
        source
          ? source === "E"
            ? dispatch(filterBySource("I"))
            : dispatch(filterBySource(null))
          : dispatch(filterBySource("E"))
      }
    >
      {source ? (source === "E" ? "External" : "Internal") : "All"}
    </button>
  );
};

export default SelectSource;
