const express = require("express");
const router = express.Router();
const {
  obtenerTurnos,
  agregarTurno,
  eliminarTurno
} = require("../controllers/turnosController");

router.get("/", obtenerTurnos);
router.post("/", agregarTurno);
router.post("/eliminar/:id", eliminarTurno);

module.exports = router;
