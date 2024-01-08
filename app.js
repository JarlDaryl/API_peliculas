//Importamos el modulo de express
const express = require("express");
//Importamos MongoDB
const mongoose = require("mongoose");

//Declaramos el puerto donde se levantara el servidor
const PORT = 3000;

const movieRouter = require("./router/movieRoutes");

//esto nos permite obtener la informacion de configuracion de ".env"
require("dotenv").config();

//Inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();

//Analizamos los archivos JSON
app.use(express.json());

const url_mongo = process.env.DATABASE_URL_DEV;

//Hacemos conexion con MongoDB
mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Conecction succesfull`);
});

db.on("disconnected", () => {
  console.log(`Conection failed`);
});

app.use("/movie", movieRouter);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
