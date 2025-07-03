const express = require("express");
const router = express.Router();
const {
  obtenerMascotas,
  agregarMascota,
  buscarMascota
} = require("../controllers/mascotasController");

router.get("/", obtenerMascotas);
router.post("/", agregarMascota);
router.get("/buscar", buscarMascota);

module.exports = router;

