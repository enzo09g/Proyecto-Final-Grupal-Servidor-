const express = require('express');
const fs = require('fs');

const app = express();

const port = 3000;

app.use(express.json())

const rutaCategorias = require('./routes/rutaCategorias');
const rutaCatProductos = require('./routes/rutaCatProductos');
const rutaProducto = require('./routes/rutaProducto');
const rutaComentarios = require('./routes/rutaComentarios');
const rutaCarrito = require('./routes/rutaCarrito');
const { error } = require('console');
const { json } = require('body-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//DESAFIATE - INCIO

app.get('/cart', (req, res) => {
    fs.readFile('./jsons/user_cart/25801.json', 'utf8', (err, data) => {
        if (err) {
            res.send("Ocurrió un error");
        } else {
            res.send(JSON.parse(data));
        }
    });

})

app.post('/cart', (req, res) => {

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

//DESAFIATE - FINAL

app.listen(port, () => {
    console.log("Bienvenido a nuestro potentismo servidor lleno de errores, corriendo en el puerto: " + port)
});

app.get('/', (req, res) => {
    res.send("<h1>Servidor</h1>")
})


app.use("/categorias", rutaCategorias);

app.use("/categoria_productos", rutaCatProductos);

app.use("/producto", rutaProducto);

app.use("/comentarios", rutaComentarios);

app.use("/usuario_carrito", rutaCarrito);


// ESTO ES UNA PRUEBA DE QUE ENZO HIZO BIEN EL REPO