import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByGenre,
  getGenres,
  selectGenreFilter,
  selectGenres,
} from "../../api";
import "./selectGenre.css";

const SelectGenre = ({ onSelect }) => {
  const dispatch = useDispatch();
  const eventHandler = (e) => {
    dispatch(
      filterByGenre(
        parseInt(e.target.value) === 0 ? null : parseInt(e.target.value)
      )
    );
  };
  const genreFilter = useSelector(selectGenreFilter);
  const genres = useSelector(selectGenres);
  useEffect(() => {
    genres[0].start && dispatch(getGenres());
  }, [genres]);
  return (
    <select
      className="select select--genre"
      value={genreFilter}
      onChange={onSelect ? onSelect : eventHandler}
    >
      <option key="option-default" value={0}>
        All Genres
      </option>
      {genres[0].id &&
        genres.map(({ id, name }) => (
          <option key={`option-${id}`} value={id}>
            {name}
          </option>
        ))}
    </select>
  );
};

export default SelectGenre;
