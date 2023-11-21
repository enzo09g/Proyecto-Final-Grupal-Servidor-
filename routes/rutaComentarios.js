const express = require('express')
const rutaComentarios = express.Router()

const controles = require("../controllers/controllers");

rutaComentarios.get("/:id", controles.crearComentarios);

module.exports = rutaComentarios;