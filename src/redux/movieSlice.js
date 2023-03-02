import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../common/movieApi";

const APIKey = "8d23dcdf";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (movie) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movie}&type=movie`
    );
    return response.data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  selectMovie: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeMovie: (state) => {
      state.selectMovie = {};
    },
  },
  extraReducers: {
    [fetchMovies.fulfilled]: (state, action) => {
      return { ...state, movies: action.payload };
    },
    [fetchMovieDetail.fulfilled]: (state, action) => {
      return { ...state, selectMovie: action.payload };
    },
  },
});

export const { removeMovie } = movieSlice.actions;
export const getMovies = (state) => state.movies.movies;
export const selectMovie = (state) => state.movies.selectMovie;
export default movieSlice.reducer;
