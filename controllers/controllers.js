const usuarios = require('../jsons/users/users.json');
const jwt = require('jsonwebtoken');
const key = 'clave';
const fs = require('fs')

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

   const crearCompra = (req, res) =>{
    let crearConfirmacion = require(`../jsons/cart/buy.json`)
    res.json(crearConfirmacion)
   }

   const crearUsuario = (req, res) =>{
    const {email, pass} = req.body;
    
    if (!email || !pass){
        return res.status(401).json({msj: 'Falta usuario o contraseña'});
    }

    const usuarioExiste = usuarios.find(user=> user.email ===email && user.pass===pass);
    if (!usuarioExiste){
        return res.status(401).json({msj:'Usuario o clave no válidos'});
    }
  
    const token = jwt.sign({userId: email.id, username:usuarioExiste.usuarios},key);
    res.token = token;
    res.send({token});
   }

   const crearCaballo = (req, res) =>{
    fs.readFile('./jsons/user_cart/25801.json', 'utf8', (err, data) => {
      if (err) {
          res.send("Ocurrió un error", err);
      }

      try {

          let carrito = JSON.parse(data);

          carrito.articles.push(req.body);

          let carritoActualizado = JSON.stringify(carrito);

          fs.writeFile('./jsons/user_cart/25801.json', carritoActualizado, 'utf8', (err) => {
              if (err) {
                  res.send("Ocurrió un error", err);
              } else {
                  res.send("Agregado Exitosamente");
              }
          });

      } catch (error) {
          res.send("Ocurrió un error", error);
      }
  })
   }


  module.exports = {
    crearCategorias,
    crearProductos,
    crearProducto,
    crearComentarios,
    crearCarrito,
    crearCompra,
    crearUsuario,
    crearCaballo
  };
    

  