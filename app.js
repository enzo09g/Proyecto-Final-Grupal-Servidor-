const express = require('express');

const app = express();

const port = 3000;

app.use(express.json())

const rutaCategorias = require('./routes/rutaCategorias')

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

// ESTO ES UNA PRUEBA DE QUE ENZO HIZO BIEN EL REPO