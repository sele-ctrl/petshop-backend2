const Producto = require("../models/Producto");

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render("productos", { productos });
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
};

const agregarProducto = async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const nuevoProducto = new Producto({ nombre, precio });
    await nuevoProducto.save();
    res.redirect("/vista-productos");
  } catch (error) {
    res.status(500).send("Error al agregar producto");
  }
};

module.exports = {
  obtenerProductos,
  agregarProducto
};