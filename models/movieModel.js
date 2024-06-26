const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  category: {
    type: [String],
    required: [true, "La categoría es obligatoria"],
  },
  director: {
    type: String,
    required: [true, "El director es obligatorio"],
  },
  rating: {
    type: String,
    required: [true, "La valoración es obligatoria"],
  },
  posterUrl: {
    type: String,
    required: [true, "La URL es obligatoria"],
  },
  trailerUrl: {
    type: String,
    required: [true, "La URL es obligatoria"],
  },
  year: {
    type: String,
    required: [true, "El año es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movie = mongoose.model("Movie", movieSchema, "movie");
//las ultimas comillas son las que apuntan a la collection que queremos
module.exports = movie;
