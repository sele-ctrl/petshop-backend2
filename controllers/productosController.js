const Producto = require("../models/Producto");
const { leerJSON, guardarJSON } = require("../utils/fileHandler");

const archivo = "productos.json";

async function obtenerProductos(req, res) {
    const productos = await leerJSON(archivo);
    res.json(productos);
}

async function agregarProducto(req, res) {
    const productos = await leerJSON(archivo);
    const {nombre, precio, stock}= req.body;
    const nuevo = new Producto(Date.now(), nombre, precio, stock);
    productos.push(nuevo);
    await guardarJSON(archivo, productos);
    res.status(201).json(nuevo);
}

module.exports = {obtenerProductos, agregarProducto};
