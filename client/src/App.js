import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./containers/Welcome";
import Display from "./store/containers/display/Display"
import Game from "./store/containers/game/Game";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/games" element={<Display/>} />
        <Route path="/games/:toSearch" element={<Display/>} />
        <Route path="/game/:id" element={<Game/>} />
      </Routes>
    </>
  );
}

export default App;
