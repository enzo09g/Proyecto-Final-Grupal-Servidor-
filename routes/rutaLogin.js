const express = require('express');
const rutaLogin = express.Router();


const controles = require('../controllers/controllers')

rutaLogin.post('/', controles.crearUsuario)

module.exports = rutaLogin;