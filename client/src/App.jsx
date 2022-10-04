import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./containers/welcome/Welcome";
import Main from "./containers/main/Main";
import Display from "./store/containers/display/Display";
import Search from "./store/containers/search/Search";
import Game from "./store/containers/game/Game";
import AddGame from "./store/containers/addGame/AddGame";
import About from "./containers/about/About";
import NotFound from "./containers/notFound/NotFound";
import "./App.css";
import BACKGROUND from "./assets/background.jpg";

function App() {
  return (
    <>
      <div className="background">
        <img
          src={BACKGROUND}
          alt="background"
          className="background background__image"
        />
        <div className="background background__filter1" />
        <div className="background background__filter2" />
      </div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/games" element={<Main />}>
          <Route index element={<Display />} />
          <Route path=":toSearch" element={<Search />} />
          <Route path="game/:id" element={<Game />} />
          <Route path="game/add" element={<AddGame />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
