const express = require('express')
const rutaCatProductos = express.Router()

const controles = require("../controllers/controllers");

rutaCatProductos.get("/:id", controles.crearProductos);

module.exports = rutaCatProductos;