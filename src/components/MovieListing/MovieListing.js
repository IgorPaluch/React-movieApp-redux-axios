import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, fetchMovies } from "../../redux/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = ({ stateHandler }) => {
  const movies = useSelector(getMovies);
  const dispatch = useDispatch();
  let renderMovies = "";

  const movie = "Harry";

  useEffect(() => {
    dispatch(fetchMovies(movie));
  }, [dispatch]);

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target.movieName.value) {
            alert("You need to type in movie");
            return;
          }
          stateHandler(e.target.movieName.value);
        }}
      >
        <input
          type="text"
          id="movieName"
          name="movieName"
          placeholder="Type movie"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      {/* <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">{renderShows}</div>
      </div> */}
    </div>
  );
};

export default MovieListing;
