const getMovies = require("../controllers/movieControllers");

const router = require("express").Router();

router.get("/movies", getMovies);

module.exports = router;
