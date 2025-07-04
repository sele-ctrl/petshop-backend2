const Producto = require("../models/Producto");

// Obtener productos y renderizar vista
async function obtenerProductos(req, res) {
    try {
        const productos = await Producto.find();
        res.render("productos", { productos });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error al obtener productos");
    }
}

// Agregar producto desde formulario
async function agregarProducto(req, res) {
    try {
        const { nombre, precio, stock } = req.body;
        const nuevo = new Producto({ nombre, precio, stock });
        await nuevo.save();
        res.redirect("/productos");
    } catch (error) {
        console.error("Error al guardar producto:", error);
        res.status(500).send("Error al guardar producto");
    }
}

// Eliminar producto por ID
async function eliminarProducto(req, res) {
    try {
        const { id } = req.params;
        await Producto.findByIdAndDelete(id);
        res.redirect("/productos");
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send("Error al eliminar producto");
    }
}

module.exports = { obtenerProductos, agregarProducto, eliminarProducto };
