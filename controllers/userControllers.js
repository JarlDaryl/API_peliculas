const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/utils");

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const token = generateToken(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          false
        );
        const token_refresh = generateToken(
          { id: user.id, email: user.email, role: user.role },
          true
        );

        res.status(201).json({
          status: "Succeed",
          message: "Usuario logueado correctamente",
          data: { user: user, token: token, token_refresh: token_refresh },
        });
      }
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    await newUser.save();
    res.status(201).json({
      status: "Succeed",
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(404)
        .json({ status: "Failed", data: null, error: "El correo ya existe" });
    }
    if (error.message.includes("Correo incorrecto")) {
      res.status(404).json({
        status: "Failed",
        data: null,
        error: "El correo o contraseña son incorrectos",
      });
    }
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const favouriteMovies = async (req, res) => {};

const addFavourite = async (req, res) => {
  try {
    const movieID = req.body.movieID;
    const userID = req.params.userID;

    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const movie = await movieModel.findById(movieID);
    if (!movie) {
      return res.status(404).json({ message: "Movie no encontrada" });
    }

    const favouriteMovie = user.favourites.includes(movieID);
    if (favouriteMovie) {
      return res.status(404).json({ message: "La movie ya esta en la lista" });
    } else {
      user.favourites.push(movieID);
      user.save();
    }
    res.status(200).json({
      status: "Succeed",
      message: "Movie añadida correctamente a favoritos",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error al recopilar la informacion de la movie",
      error: error.message,
    });
  }
};

module.exports = { signUp, login, favouriteMovies, addFavourite };
