const express = require('express')
const rutaCarrito = express.Router()

const controles = require("../controllers/controllers");

rutaCarrito.get("/:id", controles.crearCarrito);

rutaCarrito.post("/:id", controles.crearCaballo)

module.exports = rutaCarrito;