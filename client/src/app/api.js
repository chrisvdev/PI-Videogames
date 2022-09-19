import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  games: [{ loading: true }],
  game: { noGame: true },
  genres: [{ loading: true }],
  filterByGenre: 0,
  filterBySource: null,
  sortByName: null,
  sortByRating: null,
  page: 0,
  display: [{ loading: true }],
};

export const getGames = createAsyncThunk("getGames", async () => {
  const response = await axios.get(`${document.domain}:3001/videogames`);
  return response.data;
});

export const getGamesByName = createAsyncThunk(
  "getGamesByName",
  async (name) => {
    const response = await axios.get(
      `${document.domain}:3001/videogames?name=${name}`
    );
    return response.data;
  }
);

export const getGameById = createAsyncThunk("getGameById", async (id) => {
  const response = await axios.get(`${document.domain}:3001/videogame/${id}`);
  return response.data;
});

export const getGenres = createAsyncThunk("getGenres", async () => {
  const response = await axios.get(`${document.domain}:3001/genres`);
  return response.data;
});

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    filterByGenre: (state, action) => {
      state = {
        ...state,
        filterByGenre: action.payload,
        page: 0,
        display: [{ loading: true }],
      };
    },
    filterBySource: (state, action) => {
      state = {
        ...state,
        filterBySource: action.payload,
        page: 0,
        display: [{ loading: true }],
      };
    },
    sortByName: (state, action) => {
      state = {
        ...state,
        sortByName: action.payload,
        sortByRating: null,
        page: 0,
        display: [{ loading: true }],
      };
    },
    sortByRating: (state, action) => {
      state = {
        ...state,
        sortByName: null,
        sortByRating: action.payload,
        page: 0,
        display: [{ loading: true }],
      };
    },
    display: (state) => {
      let toDisplay = JSON.parse(JSON.stringify(state.games));
      if (!toDisplay[0].loading) {
        state.filterByGenre &&
          (toDisplay = toDisplay.filter((game) =>
            game.genres.find((genre) => genre.id === state.filterByGenre)
          ));
        state.filterBySource &&
          (toDisplay = toDisplay.filter(
            (game) => game.id[0] === state.filterBySource
          ));
        state.sortByName &&
          (toDisplay = toDisplay.sort((g1, g2) => {
            return (
              g1.name.toLowerCase().localeCompare(g2.name.toLowerCase()) *
              state.sortByName
            );
          }));
        state.sortByRating &&
          (toDisplay = toDisplay.sort(
            (g1, g2) => (g1.rating - g2.rating) * state.sortByRating
          ));
      }
      state = { ...state, display: toDisplay };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state = {
          ...state,
          games: [{ loading: true }],
          filterByGenre: 0,
          filterBySource: null,
          sortByName: null,
          sortByRating: null,
          page: 0,
          display: [{ loading: true }],
        };
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state = { ...state, games: action.payload };
      })
      .addCase(getGamesByName.pending, (state) => {
        state = {
          ...state,
          games: [{ loading: true }],
          filterByGenre: 0,
          filterBySource: null,
          sortByName: null,
          sortByRating: null,
          page: 0,
          display: [{ loading: true }],
        };
      })
      .addCase(getGamesByName.fulfilled, (state, action) => {
        state = { ...state, games: action.payload };
      })
      .addCase(getGameById.pending, (state) => {
        state = { ...state, game: [{ loading: true }] };
      })
      .addCase(getGameById.fulfilled, (state, action) => {
        state = { ...state, game: action.payload };
      })
      .addCase(getGenres.pending, (state) => {
        state = { ...state, genres: [{ loading: true }] };
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state = { ...state, genres: action.payload };
      });
  },
});

export const selectGame = (state) => state.game;
export const selectGenres = (state) => state.genres;
export const selectGenreFilter = (state) => state.filterByGenre;
export const selectSourceFilter = (state) => state.filterBySource;
export const selectNameSort = (state) => state.sortByName;
export const selectRatingSort = (state) => state.sortByRating;
export const selectPage = (state) => state.page;
export const selectDisplay = (state) => state.display;

export const {
  filterByGenre,
  filterBySource,
  sortByName,
  sortByRating,
  display,
} = apiSlice.actions;

export default apiSlice.reducer;
