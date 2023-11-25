const express = require('express')
const rutaCarritoUsuario = express.Router()

const controles = require("../controllers/controllers");

rutaCarritoUsuario.get("/:id", controles.crearCarritoUsuario);

module.exports = rutaCarritoUsuario;