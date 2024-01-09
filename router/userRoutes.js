const {
  signUp,
  login,
  favouriteMovies,
  addFavourite,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", signUp);
router.post("/login", login);
router.get("/favourite/:id", favouriteMovies);
router.post("/addFavourite/:id", addFavourite);

module.exports = router;
