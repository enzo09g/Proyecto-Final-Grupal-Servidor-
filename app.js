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
const { error } = require('console');
const bodyParser  = require('body-parser');
const rutaCarrito = require('./routes/rutaCarrito');
const rutaCrearCompra = require('./routes/rutaCrearCompra');
const rutaLogin = require('./routes/rutaLogin');

const CORS = require('cors')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();

});

app.use(CORS());

app.use(bodyParser.json())



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


app.get('/', (req, res) => {
    res.send("<h1>Servidor</h1>")
});


app.use("/categorias", rutaCategorias);

app.use("/categoria_productos", rutaCatProductos);

app.use("/producto", rutaProducto);

app.use("/comentarios", rutaComentarios);

app.use("/confirmacion_compra", rutaCrearCompra);

app.use("/cart", rutaCarrito);

app.use("/login", rutaLogin); 

