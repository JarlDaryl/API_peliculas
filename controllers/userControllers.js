const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      //   if (validatePassword) {
      //     const token = generateToken({});
      //   }
      res.status(201).json({
        status: "Succeed",
        message: "Usuario logueado correctamente",
        data: user,
      });
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

module.exports = { signUp, login };
