const rawg = require("./rawg");
const { dataBase } = require("./db.js");

class DataMerger {
  constructor(internal, external) {
    this.external = external;
    this.internal = internal;
  }
  async getGenres() {
    return await this.internal.getGenres();
  }
  async getGames(p) {
    let internal = await this.internal.getGames();
    let external = await this.external.getGames(p ? p : 5);
    console.log(internal);
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
    return [...internal, ...external].map(
      ({ id, name, genres, background_image }) => {
        return {
          id: id,
          name: name,
          genres: genres.map(({ id, name }) => {
            return { id: id, name: name };
          }),
          background_image,
        };
      }
    );
  }
  async getGameByID(id) {
    if (id.length > 1) {
      const location = id.slice(0, 1);
      const lID = parseInt(id.slice(1, id.length));
      let game;
      switch (location) {
        case "E":
          game = await this.external.getGameByID(lID);
          game = {
            ...game,
            id: `E${game.id}`,
            genres: game.genres.map(({ id, name }) => {
              return { id: id, name: name };
            }),
          };
          break;
        case "I":
          game = await this.internal.getGameByID(lID);
          game = { ...game, id: `I${game.id}` };
          break;
        default:
          return { error: "Bad ID" };
      }
      return {
        id: game.id,
        name: game.name,
        genres: game.genres,
        background_image: game.background_image,
        description: game.description,
        released: game.released,
        rating: game.rating,
        parent_platforms: game.parent_platforms,
      };
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
    const result = [...internal, ...external];
    return result.length > 0
      ? result.slice(0, 15).map(({ id, name }) => {
          return { id: id, name: name };
        })
      : { notFound: `no games found like ${name}` };
  }
  async postGame(game) {
    return await this.internal.postGame(game);
  }
}

module.exports = new DataMerger(dataBase, rawg);
