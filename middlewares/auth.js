const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_REFRESH);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Expired Token");
    }
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = verified.role;

    if (role === "user") {
      return res.status(401).json({
        status: "Failed",
        message: "No tienes acceso",
        error: null,
      });
    } else {
      req.user = verified;
      next();
    }
  } catch (error) {
    res.status(404).send("No tienes acceso");
  }
};

module.exports = { verifyToken, verifyAdmin };
