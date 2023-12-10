const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, console.log("Servidor encendido"));

app.use(express.json());

app.get("/home", (req, res) => {
    res.send("Hello World Express Js")
    })

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

app.delete("/productos/:id", (req, res) => {
    const { id } = req.params
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index, 1)
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto eliminado con éxito")
})

app.put("/productos/:id", (req, res) => {
    const { id } = req.params
    const producto = req.body
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)
    productos[index] = producto
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto modificado con éxito")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
    