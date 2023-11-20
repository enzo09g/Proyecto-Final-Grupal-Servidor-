`
https://japceibal.github.io/emercado-api/cats/cat.json
https://japceibal.github.io/emercado-api/cats_products/
https://japceibal.github.io/emercado-api/products/
https://japceibal.github.io/emercado-api/products_comments/
https://japceibal.github.io/emercado-api/user_cart/
`

const express = require('express')
const rutaCategorias = express.Router()

const controlesCategorias = require("../controllers/controllers");

rutaCategorias.get("/", controlesCategorias.crearCategorias);





module.exports = rutaCategorias;
