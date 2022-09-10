require("dotenv").config();
const axios = require("axios");
const GAMES_PER_PAGE_ON_RAWG_RESULT = 20;

class Rawg {
  constructor(key) {
    this.key = key;
    this.games = [];
  }
  async getGenres() {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/genres?key=${this.key}`
      );
      return response.data.results;
    } catch (e) {
      return e;
    }
  }
  async getGames(p) {
    const pages = p ? p : 1;
    let response = undefined;
    try {
      this.games = [];
      while (this.games.length !== pages * GAMES_PER_PAGE_ON_RAWG_RESULT) {
        response = await axios.get(
          response
            ? response.data.next
            : `https://api.rawg.io/api/games?key=${this.key}`
        );
        this.games = [...this.games, ...response.data.results];
      }
      return this.games;
    } catch (e) {
      return e;
    }
  }

  async getGameByID(id) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${this.key}`
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
  async getGamesByName(name) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${this.key}&search=${name}`
      );
      return response.data.results;
    } catch (e) {
      return e;
    }
  }
}

module.exports = new Rawg(process.env.API_KEY);
