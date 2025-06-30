const Producto = require("../models/Producto");

//------------BAJO PPROD-------------------------
async function obtenerProductos(req, res) {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
}

//--------------AGREGO PROD-------------
async function agregarProducto(req, res) {
    try {
        const { nombre, precio, stock } = req.body;
        const nuevo = new Producto({ nombre, precio, stock });
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el producto" });
    }
}

module.exports = { obtenerProductos, agregarProducto };
