const {
  getMovies,
  getMovieById,
  getRecentMovies,
  getPopularMovies,
} = require("../controllers/movieControllers");

const router = require("express").Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/recent_movies", getRecentMovies);
router.get("/most_popular", getPopularMovies);

module.exports = router;
