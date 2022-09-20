import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { display, getGames, selectDisplay, selectGame } from "./store/api";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const toDisplay = useSelector(selectDisplay);
  const games = useSelector(selectGame);
  useEffect(() => {
    dispatch(getGames());
  }, []);
  useEffect(() => {
    games && !games[0].loading && dispatch(display());
  }, [games]);
  useEffect(() => {
    console.log(toDisplay);
  }, [toDisplay]);
  return (
    <>
      <h1>Hola mundo!</h1>
      <button
        onClick={() => {
          dispatch(display());
          console.log(toDisplay);
        }}
      >
        Click
      </button>
      <Routes>
        <Route path="/" element={<div>Raíz</div>} />
        <Route path="/noroot" element={<div>no Raíz</div>} />
      </Routes>
    </>
  );
}

export default App;
