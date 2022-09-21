import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/games");
    }, 5000);
  }, []);
  return <h1>NotFound, returning to main...</h1>;
};

export default NotFound;
