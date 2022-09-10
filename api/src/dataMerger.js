const rawg = require("./rawg");
const { dataBase } = require("./db.js");

class DataMerger {
  constructor(internal, external) {
    this.external = external;
    this.internal = internal;
  }
  async getGenres() {
    let external = await this.external.getGenres();
    let internal = await this.internal.getGenres();
    if (!Array.isArray(external)) return external;
    if (!Array.isArray(internal)) return internal;
    return [...internal, ...external];
  }
  async getGames(p) {
    let external = await this.external.getGames(p);
    let internal = await this.internal.getGames(p);
    if (!Array.isArray(external)) return external;
    else
      external = external.map((game) => {
        return { ...game, id: `E${game.id}` };
      });
    if (!Array.isArray(internal)) return internal;
    else
      internal = internal.map((game) => {
        return { ...game, id: `I${game.id}` };
      });
    return [...internal, ...external];
  }
  async getGameByID(id) {
    if (id.length > 1) {
      const location = id.slice(0, 1);
      const lID = parseInt(id.slice(1, id.length));
      let game;
      switch (location) {
        case "E":
          game = await this.external.getGameByID(lID);
          return { ...game, id: `E${game.id}` };
        case "I":
          game = await this.internal.getGameByID(lID);
          return { ...game, id: `E${game.id}` };
        default:
          return { error: "Bad ID" };
      }
    } else return { error: "Bad ID" };
  }
  async getGamesByName(name) {
    let external = await this.external.getGamesByName(name);
    let internal = await this.internal.getGamesByName(name);
    if (!Array.isArray(external)) return external;
    else
      external = external.map((game) => {
        return { ...game, id: `E${game.id}` };
      });
    if (!Array.isArray(internal)) return internal;
    else
      internal = internal.map((game) => {
        return { ...game, id: `I${game.id}` };
      });
    return [...internal, ...external];
  }
  async postGame(game) {
    return await this.internal.postGame(game);
  }
}

module.exports = new DataMerger(dataBase, rawg);
