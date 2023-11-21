
const crearCategorias = (req,res)=>{
    let categorias = require('../jsons/cats/cat.json');
    res.json(categorias);
  };

   const crearProductos = (req, res) =>{
    let productos = require(`../jsons/cats_products/${req.params.id}`)
    res.json(productos)
   }

   const crearProducto = (req, res) =>{
    let producto = require(`../jsons/products/${req.params.id}`)
    res.json(producto)
   }

   const crearComentarios = (req, res) =>{
    let comentarios = require(`../jsons/products_comments/${req.params.id}`)
    res.json(comentarios)
   }

   const crearCarrito = (req, res) =>{
    let infoCarrito = require(`../jsons/user_cart/${req.params.id}`)
    res.json(infoCarrito)
   }

  module.exports = {
    crearCategorias,
    crearProductos,
    crearProducto,
    crearComentarios,
    crearCarrito
  };
    

  