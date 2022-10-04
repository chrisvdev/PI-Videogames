import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css"

const Nav = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <nav className="nav__container">
      <NavLink
        to={"/games"}
        className={(isActive) =>
          !isActive ? "btn nav__btn nav__btn-active" : "btn nav__btn"
        }
      >
        Games
      </NavLink>
      <NavLink
        to={"/games/game/add"}
        className={(isActive) =>
          !isActive ? "btn nav__btn nav__btn-active" : "btn nav__btn"
        }
      >
        Create Game
      </NavLink>
      <NavLink
        to={"/about"}
        className={(isActive) =>
          !isActive ? "btn nav__btn nav__btn-active" : "btn nav__btn"
        }
      >
        About
      </NavLink>
      <form
        className="nav__search"
        onSubmit={(e) => {
          e.preventDefault();
          search.length > 0 && navigate(`/games/${search}`);
          setSearch("");
        }}
      >
        <input
          type="text"
          value={search}
          placeholder="Type a game..."
          onChange={({ target }) => {
            return target.value === ""
              ? setSearch("")
              : target.value[target.value.length - 1] !== "." &&
                target.value[target.value.length - 1] !== "?"
              ? setSearch(target.value)
              : null;
          }}
        />
        <button type="submit" className="btn nav__btn nav__search-btn">
          Search
        </button>
      </form>
    </nav>
  );
};

export default Nav;
