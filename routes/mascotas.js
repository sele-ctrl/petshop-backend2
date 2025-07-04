const express = require("express");
const router = express.Router();
const {
    obtenerMascotas,
    agregarMascota,
    buscarMascota,
    eliminarMascota
} = require("../controllers/mascotasController");

router.get("/", obtenerMascotas);
router.post("/", agregarMascota);
router.get("/buscar", buscarMascota);
router.post("/eliminar/:id", eliminarMascota);

module.exports = router;
