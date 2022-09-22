import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPlatforms,
  selectPlatforms,
} from "../../api";
import "./selectPlatform.css";

const SelectPlatform = ({ value, name, onSelect }) => {
  const dispatch = useDispatch();
  const platforms = useSelector(selectPlatforms);
  useEffect(() => {
    platforms[0].start && dispatch(getPlatforms());
  }, [platforms]);
  return (
    <select
      className="select select--genre"
      name={name ? name : ""}
      value={value}
      onChange={onSelect}
    >
      <option key="option-default" value={0}>
        Platforms
      </option>
      {platforms[0].id &&
        platforms.map(({ id, name }) => (
          <option key={`option-${id}`} value={id}>
            {name}
          </option>
        ))}
    </select>
  );
};

export default SelectPlatform;
