const express = require('express');

const app = express();

const port = 3000;

app.use(express.json())

const rutaCategorias = require('./routes/rutaCategorias');
const rutaCatProductos = require('./routes/rutaCatProductos');
const rutaProducto = require('./routes/rutaProducto');
const rutaComentarios = require('./routes/rutaComentarios');
const rutaCarrito = require('./routes/rutaCarrito');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  


app.listen(port, () =>{
    console.log("Bienvenido a nuestro potentismo servidor lleno de errores, corriendo en el puerto: " + port )
});

app.get('/', (req,res) => {
    res.send("<h1>Servidor</h1>")
})

app.use("/categorias", rutaCategorias);

app.use("/categoria_productos", rutaCatProductos);

app.use("/producto", rutaProducto);

app.use("/comentarios", rutaComentarios);

app.use("/usuario_carrito", rutaCarrito);


// ESTO ES UNA PRUEBA DE QUE ENZO HIZO BIEN EL REPO