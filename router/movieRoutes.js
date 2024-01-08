const {
  getMovies,
  getMovieById,
  getRecentMovies,
} = require("../controllers/movieControllers");

const router = require("express").Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/recent_movies", getRecentMovies);

module.exports = router;
