const express = require('express')
const rutaCrearCompra = express.Router()

const controles = require("../controllers/controllers");

rutaCrearCompra.get("/", controles.crearCompra);

module.exports = rutaCrearCompra;