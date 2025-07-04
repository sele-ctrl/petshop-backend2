const express = require("express");
const router = express.Router();
const {
  obtenerTurnos,
  agregarTurno
} = require("../controllers/turnosController");

router.get("/", obtenerTurnos);
router.post("/", agregarTurno);

module.exports = router;


