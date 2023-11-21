const express = require('express')
const rutaProducto = express.Router()

const controles = require("../controllers/controllers");

rutaProducto.get("/:id", controles.crearProducto);

module.exports = rutaProducto;