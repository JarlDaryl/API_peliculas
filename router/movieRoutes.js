const {
  getMovies,
  getMovieById,
  getRecentMovies,
  getPopularMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieControllers");
const { verifyAdmin } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/recent_movies", getRecentMovies);
router.get("/most_popular", getPopularMovies);
router.post("/addMovie", verifyAdmin, addMovie);
router.delete("/deleteMovie/:id", verifyAdmin, deleteMovie);
router.patch("/updateMovie/:id", verifyAdmin, updateMovie);

module.exports = router;
