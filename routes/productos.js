const express = require("express");
const router = express.Router();
const {
    obtenerProductos,
    agregarProducto,
    eliminarProducto
} = require("../controllers/productosController");

router.get("/", obtenerProductos);
router.post("/", agregarProducto);
router.post("/eliminar/:id", eliminarProducto);

module.exports = router;
