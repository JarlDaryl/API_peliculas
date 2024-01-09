const {
  getMovies,
  getMovieById,
  getRecentMovies,
  getPopularMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieControllers");

const router = require("express").Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/recent_movies", getRecentMovies);
router.get("/most_popular", getPopularMovies);
router.post("/addMovie", addMovie);
router.delete("/deleteMovie/:id", deleteMovie);
router.patch("/updateMovie/:id", updateMovie);

module.exports = router;
