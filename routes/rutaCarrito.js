const express = require('express')
const rutaCarrito = express.Router()

const controles = require("../controllers/controllers");

rutaCarrito.get("/", controles.crearCarrito);

module.exports = rutaCarrito;