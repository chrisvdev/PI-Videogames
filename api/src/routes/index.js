const { Router } = require("express");
const dataMerger = require("../dataMerger");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  const games = req.query.name
    ? await dataMerger.getGamesByName(req.query.name)
    : await dataMerger.getGames(req.body.pages);
  Array.isArray(games)
    ? res.status(200).send(games)
    : res.status(500).send(games);
});

router.post("/videogames", async (req, res) => {
  const done = await dataMerger.postGame(req.body);
  done.success ? res.status(200).send(done) : res.status(400).send(done);
});

router.get("/videogame/:id", async (req, res) => {
  const game = await dataMerger.getGameByID(req.params.id);
  game.error ? res.status(400).send(game) : res.status(200).send(game);
});
router.get("/genres", async (req, res) => {
  const genres = await dataMerger.getGenres();
  Array.isArray(genres)
    ? res.status(200).send(genres)
    : res.status(500).send(genres);
});
router.get("/platforms", async (req, res) => {
  const platform = await dataMerger.getPlatforms();
  Array.isArray(platform)
    ? res.status(200).send(platform)
    : res.status(500).send(platform);
});

router;

module.exports = router;
