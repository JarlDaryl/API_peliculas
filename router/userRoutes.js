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
router.post("/addFavourite/:id", addFavourite);

router.get("/favourite/:id", favouriteMovies);

module.exports = router;
