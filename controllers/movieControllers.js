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

const addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      director,
      rating,
      posterURL,
      trailerURL,
      year,
      createdAt,
    } = req.body;

    const newMovie = new movieModel({
      title,
      description,
      category,
      director,
      rating,
      posterURL,
      trailerURL,
      year,
      createdAt,
    });

    await newMovie.save();
    res
      .status(201)
      .json({ status: "Pelicula creada correctamente", newMovie, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieID = req.params.id;
    const movie = await movieModel.findById(movieID);

    if (!movie) {
      return res.status(404).send("La película no existe");
    }

    await movieModel.findByIdAndDelete(movieID);
    res
      .status(200)
      .send({ status: "Pelicula eliminada correctamente", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieID = req.params.id;
    const {
      title,
      description,
      category,
      director,
      rating,
      posterURL,
      trailerURL,
      year,
      createdAt,
    } = req.body;

    const movie = await movieModel.findById(movieID);

    if (!movie) {
      return res.status(404).send("La movie no existe"); // Si el product no existe, devuelve un mensaje de error
    }

    if (title) {
      movie.title = title; // Actualiza el nombre del movie si se proporciona un nuevo nombre
    }

    if (description) {
      movie.description = description;
    }

    if (category) {
      movie.category = category;
    }

    if (director) {
      movie.director = director;
    }

    if (rating) {
      movie.rating = rating;
    }

    if (posterURL) {
      movie.posterURL = posterURL;
    }

    if (trailerURL) {
      movie.trailerURL = trailerURL;
    }

    if (year) {
      movie.year = year;
    }

    if (createdAt) {
      movie.createdAt = createdAt;
    }

    await movie.save();
    res
      .status(200)
      .json({ status: "Movie actualizada correctamente", movie, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

module.exports = {
  getMovies,
  getMovieById,
  getRecentMovies,
  getPopularMovies,
  addMovie,
  deleteMovie,
  updateMovie,
};
