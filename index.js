const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, console.log("Servidor encendido"));

app.use(express.json());

app.get("/productos", (req, res) => {
    const productos = JSON.parse(fs.readFileSync("productos.json"));
    res.json(productos);
})

app.post("/productos", (req, res) => {

    const producto = req.body;
    const productos = JSON.parse(fs.readFileSync("productos.json"));
    productos.push(producto);
    fs.writeFileSync("productos.json", JSON.stringify(productos));
    res.send("Producto agregado con éxito!");
})
