const movieModel = require("../models/movieModel");

const getMovies = async (req, res) => {
  try {
    const data = await movieModel.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = getMovies;
