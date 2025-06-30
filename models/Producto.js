const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
}, { collection: "productos" });

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
