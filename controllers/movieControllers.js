const movieModel = require("../models/movieModel");

const getMovies = async (req, res) => {
  try {
    const data =
      await movieModel.find(); /*Poniendo {}, { title: 1 } dentro del find solo  ostraria el titulo */
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id; // Obtiene el ID de los parámetros de la solicitud
    const movie = await movieModel.findById(movieId); // Busca por su ID
    res.status(200).json({ status: "succeeded", movie, error: null }); // Devuelve el usuario encontrado
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const getRecentMovies = async (req, res) => {
  try {
    const data = await movieModel.find().sort({ createdAt: 1 }).limit(10);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getPopularMovies = async (req, res) => {
  try {
    const data = await movieModel.find().sort({ rating: -1 }).limit(10);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = { getMovies, getMovieById, getRecentMovies, getPopularMovies };
