const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
    unique: true,
    trim: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minLength: 4,
  },
  role: {
    type: String,
    required: [true, "El Rol es obligatorio"],
    enum: ["user", "admin"],
    default: "user",
  },
  favourites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "movie", // Referencia al modelo de usuario
  },
});

const user = mongoose.model("User", userSchema, "user");
//las ultimas comillas son las que apuntan a la collection que queremos
module.exports = user;
