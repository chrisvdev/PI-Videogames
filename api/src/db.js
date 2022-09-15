require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const rawg = require("./rawg");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aca vendrían las relaciones
// Product.hasMany(Reviews);

Videogame.belongsToMany(Genre, { through: "genresPerGame" });
Genre.belongsToMany(Videogame, { through: "genresPerGame" });

class DataBase {
  constructor(rawg) {
    this.rawg = rawg;
  }
  async writeGenre({ id, name }, modifier) {
    try {
      const genre = await Genre.findOne({ where: { id: id } });
      if (genre) {
        if (modifier) {
          genre.name = name;
          await genre.save();
        }
      } else await Genre.create({ id: id, name: name });
      return { success: true };
    } catch (error) {
      return error;
    }
  }
  async createGenres() {
    const rawgGenres = await this.rawg.getGenres();
    const proms = rawgGenres.map(async ({ id, name }) => {
      return await this.writeGenre({ id: id, name: name }, true);
    });
  }
  async getGenres() {
    try {
      const result = await Genre.findAll();
      return result
        ? result.map(({ dataValues }) => {
            return dataValues;
          })
        : [];
    } catch (error) {
      return error;
    }
  }
  async getGameByID(id) {
    try {
      const game = await Videogame.findOne({ where: { id: id } });
      if (game) {
        let genres = await game.getGenres();
        return {
          ...game.dataValues,
          genres: genres.map(({ id, name }) => {
            return { id: id, name: name };
          }),
        };
      } else return { error: "Bad ID" };
    } catch (error) {
      return error;
    }
  }
  async getGames() {
    try {
      const queryResult = await Videogame.findAll({ attributes: ["id"] });
      return queryResult
        ? await Promise.all(
            queryResult
              .map((result) => {
                return result.dataValues.id;
              })
              .map(async (id) => {
                return await this.getGameByID(id);
              })
          )
        : [];
    } catch (error) {
      return error;
    }
  }
  async getGamesByName(name) {
    try {
      const queryResult = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      return queryResult
        ? queryResult.map((element) => {
            return element.dataValues;
          })
        : [];
    } catch (error) {
      return error;
    }
  }
  async postGame({
    name,
    description,
    released,
    rating,
    parent_platforms,
    genres,
  }) {
    try {
      const videogame = await Videogame.create({
        name: name,
        description: description,
        released: released,
        rating: rating,
        parent_platforms: parent_platforms,
      });
      genres.forEach(async ({ id, name }) => {
        const genre = await Genre.findOne({ where: { id: id } });
        genre
          ? await videogame.addGenre(genre)
          : await videogame.createGenre({ id: id, name: name });
      });
    } catch (error) {
      return error;
    }
    return { success: true };
  }
}

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
  dataBase: new DataBase(rawg),
};
