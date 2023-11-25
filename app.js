const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const key = 'clave'

app.use(express.json());

const rutaCategorias = require('./routes/rutaCategorias');
const rutaCatProductos = require('./routes/rutaCatProductos');
const rutaProducto = require('./routes/rutaProducto');
const rutaComentarios = require('./routes/rutaComentarios');
const rutaCarrito = require('./routes/rutaCarrito');
const rutaCarritoUsuario = require('./routes/rutaCarritoUsuario');
const usuarios = require('./jsons/users/users.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

app.post("/login", (req, res) => {

 const {usuario, contraseña} = req.body;
    
  if (!usuario || !contraseña){
        return res.status(401).json({msj: 'Falta usuario o contraseña'});
    }

    const usuarioExiste = usuarios.find(user=> user.usuario ===usuario && user.contraseña===contraseña);
    if (!usuarioExiste){
        return res.status(401).json({msj:'Usuario o clave no válidos'});
    }
  
    const token = jwt.sign({userId: usuario.id, username:usuarioExiste.usuarios},key/*,{expiresIn: Math.floor(Date.now()/100)+10}*/);
    res.token = token;
    res.send(token);
});

app.use("/cart", (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers["access-token"], key);
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: "Usuario no autorizado" });
    }
});

app.listen(port, () =>{
    console.log("Bienvenido a nuestro potentismo servidor cuántico, corriendo en el puerto: " + port )
});

app.get('/', (req,res) => {
    res.send("<h1>Servidor</h1>")
});

app.use("/categorias", rutaCategorias);

app.use("/categoria_productos", rutaCatProductos);

app.use("/producto", rutaProducto);

app.use("/comentarios", rutaComentarios);

app.use("/cart", rutaCarrito);

app.use("/usuario_carrito", rutaCarritoUsuario);


// ESTO ES UNA PRUEBA DE QUE ENZO HIZO BIEN EL REPO