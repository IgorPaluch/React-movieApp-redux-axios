import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../redux/movieSlice";
import MovieListing from "../MovieListing/MovieListing";

const Home = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState("Harry");

  useEffect(() => {
    dispatch(fetchMovies(state));
  }, [dispatch, state]);

  const stateHandler = (state) => {
    setState(state);
  };
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing stateHandler={stateHandler} />
    </div>
  );
};

export default Home;
