const { signUp, login } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/", signUp);
router.post("/login", login);

module.exports = router;
