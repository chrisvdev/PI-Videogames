import React from "react";
import { Routes, Route } from "react-router-dom";
import SortByRating from "./store/components/sortByRating/SortByRating";
import SortByName from "./store/components/sortByName/SortByName";
import SelectSource from "./store/components/selectSource/SelectSource";
import SelectGenre from "./store/components/selectGenre/SelectGenre";
import Display from "./store/components/display/Display";
import "./App.css";

function App() {
  return (
    <>
      <SortByRating />
      <SortByName/>
      <SelectSource/>
      <SelectGenre/>
      <Display/>
      <Routes>
        <Route path="/" element={<div>Raíz</div>} />
        <Route path="/noroot" element={<div>no Raíz</div>} />
      </Routes>
    </>
  );
}

export default App;
