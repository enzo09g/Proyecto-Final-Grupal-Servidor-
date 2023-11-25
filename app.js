const express = require('express');
const fs = require('fs');

const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const key = 'clave'

app.use(express.json());

const rutaCategorias = require('./routes/rutaCategorias');
const rutaCatProductos = require('./routes/rutaCatProductos');
const rutaProducto = require('./routes/rutaProducto');
const rutaComentarios = require('./routes/rutaComentarios');
const { error } = require('console');
const bodyParser  = require('body-parser');
const rutaCarrito = require('./routes/rutaCarrito');
const usuarios = require('./jsons/users/users.json');
const rutaCrearCompra = require('./routes/rutaCrearCompra');

const CORS = require('cors')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();

});

app.use(CORS());

app.use(bodyParser.json())

//DESAFIATE - INCIO

// app.get('/cart', (req, res) => {
//     fs.readFile('./jsons/user_cart/25801.json', 'utf8', (err, data) => {
//         if (err) {
//             res.send("Ocurrió un error");
//         } else {
//             res.send(JSON.parse(data));
//         }
//     });

// })


app.post("/login", (req, res) => {
    
    const {email, pass} = req.body;
    
    if (!email || !pass){
        return res.status(401).json({msj: 'Falta usuario o contraseña'});
    }

    const usuarioExiste = usuarios.find(user=> user.email ===email && user.pass===pass);
    if (!usuarioExiste){
        return res.status(401).json({msj:'Usuario o clave no válidos'});
    }
  
    const token = jwt.sign({userId: email.id, username:usuarioExiste.usuarios},key/*,{expiresIn: Math.floor(Date.now()/100)+10}*/);
    res.token = token;
    res.send({token});
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

//DESAFIATE - FINAL

app.get('/', (req, res) => {
    res.send("<h1>Servidor</h1>")
});

app.post('/cart/:id', (req, res) => {

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
    });
  });

app.use("/categorias", rutaCategorias);

app.use("/categoria_productos", rutaCatProductos);

app.use("/producto", rutaProducto);

app.use("/comentarios", rutaComentarios);

app.use("/confirmacion_compra", rutaCrearCompra);

app.use("/cart", rutaCarrito);


// ESTO ES UNA PRUEBA DE QUE ENZO HIZO BIEN EL REPO