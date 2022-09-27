import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FROM_GET_GAMES = "GET_GAMES";
export const FROM_SEARCH_GAMES = "SEARCH_GAMES";
export const FROM_SEARCH_GAME = "SEARCH_GAME";
export const FROM_GET_GENRES = "GET_GENRES";
export const FROM_GET_PLATFORMS = "GET_PLATFORMS";
export const FROM_FILTER_OR_SORT = "FILTER_OR_SORT";
export const FROM_START = "START";
const PORT = undefined; //3001 for dev

let initialState = {
  games: [{ start: true }],
  game: { noGame: true },
  genres: [{ start: true }],
  parent_platforms: [{ start: true }],
  filterByGenre: 0,
  filterBySource: null,
  sortByName: null,
  sortByRating: null,
  display: [{ idle: FROM_START }],
};

export const getGames = createAsyncThunk("api/getGames", async () => {
  try {
    const response = await axios.get(
      `http://${document.domain}${PORT?PORT:""}/videogames`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getGamesByName = createAsyncThunk(
  "api/getGamesByName",
  async (name) => {
    try {
      const response = await axios.get(
        `http://${document.domain}${PORT?PORT:""}/videogames?name=${name}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getGameById = createAsyncThunk("api/getGameById", async (id) => {
  try {
    const response = await axios.get(
      `http://${document.domain}${PORT?PORT:""}/videogame/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getGenres = createAsyncThunk("api/getGenres", async () => {
try {
    const response = await axios.get(`http://${document.domain}${PORT?PORT:""}/genres`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getPlatforms = createAsyncThunk("api/getPlatforms", async () => {
try {
    const response = await axios.get(`http://${document.domain}${PORT?PORT:""}/platforms`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    start: (state) => {
      state.games = [{ start: true }];
      state.game = { noGame: true };
      state.genres = [{ start: true }];
      state.parent_platforms = [{ start: true }];
      state.filterByGenre = 0;
      state.filterBySource = null;
      state.sortByName = null;
      state.sortByRating = null;
      state.display = [{ idle: FROM_START }];
    },
    filterByGenre: (state, action) => {
      state.filterByGenre = action.payload;
      state.display = [{ toBeFilled: FROM_FILTER_OR_SORT }];
    },
    filterBySource: (state, action) => {
      state.filterBySource = action.payload;
      state.display = [{ toBeFilled: FROM_FILTER_OR_SORT }];
    },
    sortByName: (state, action) => {
      state.sortByName = action.payload;
      state.sortByRating = null;
      state.display = [{ toBeFilled: FROM_FILTER_OR_SORT }];
    },
    sortByRating: (state, action) => {
      state.sortByName = null;
      state.sortByRating = action.payload;
      state.display = [{ toBeFilled: FROM_FILTER_OR_SORT }];
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
      state.display =
        toDisplay.length > 0 ? toDisplay : [{ toBeFilled: false }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.games = [{ loading: FROM_GET_GAMES }];
        state.filterByGenre = 0;
        state.filterBySource = null;
        state.sortByName = null;
        state.sortByRating = null;
        state.display = [{ idle: FROM_GET_GAMES }];
      })
      .addCase(getGames.rejected, (state) => {
        state.games = [{ rejected: FROM_GET_GAMES }];
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload;
        state.display = [{ toBeFilled: FROM_GET_GAMES }];
      })
      .addCase(getGamesByName.pending, (state) => {
        state.games = [{ loading: FROM_SEARCH_GAMES }];
        state.filterByGenre = 0;
        state.filterBySource = null;
        state.sortByName = null;
        state.sortByRating = null;
        state.display = [{ idle: FROM_SEARCH_GAMES }];
      })
      .addCase(getGamesByName.rejected, (state) => {
        state.games = [{ rejected: FROM_SEARCH_GAMES }];
      })
      .addCase(getGamesByName.fulfilled, (state, action) => {
        state.games = action.payload;
        state.display = [{ toBeFilled: FROM_SEARCH_GAMES }];
      })
      .addCase(getGameById.pending, (state) => {
        state.game = { loading: FROM_SEARCH_GAME };
      })
      .addCase(getGameById.rejected, (state) => {
        state.game = { rejected: FROM_SEARCH_GAME };
      })
      .addCase(getGameById.fulfilled, (state, action) => {
        state.game = action.payload;
      })
      .addCase(getGenres.pending, (state) => {
        state.genres = [{ loading: FROM_GET_GENRES }];
      })
      .addCase(getGenres.rejected, (state) => {
        state.genres = [{ rejected: FROM_GET_GENRES }];
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(getPlatforms.pending, (state) => {
        state.parent_platforms = [{ loading: FROM_GET_PLATFORMS }];
      })
      .addCase(getPlatforms.rejected, (state) => {
        state.parent_platforms = [{ rejected: FROM_GET_PLATFORMS }];
      })
      .addCase(getPlatforms.fulfilled, (state, action) => {
        state.parent_platforms = action.payload;
      });
  },
});

export const selectGames = (state) => state.api.games;
export const selectGame = (state) => state.api.game;
export const selectGenres = (state) => state.api.genres;
export const selectGenreFilter = (state) => state.api.filterByGenre;
export const selectSourceFilter = (state) => state.api.filterBySource;
export const selectNameSort = (state) => state.api.sortByName;
export const selectRatingSort = (state) => state.api.sortByRating;
export const selectDisplay = (state) => state.api.display;
export const selectPlatforms = (state) => state.api.parent_platforms;

export const {
  start,
  filterByGenre,
  filterBySource,
  sortByName,
  sortByRating,
  display,
} = apiSlice.actions;

export default apiSlice.reducer;
