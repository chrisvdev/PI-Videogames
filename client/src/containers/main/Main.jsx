import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../components/nav/Nav";

const Main = () => {
  return (
    <>
      <header className="container header">
        <Nav />
      </header>
      <Outlet />
    </>
  );
};

export default Main;
