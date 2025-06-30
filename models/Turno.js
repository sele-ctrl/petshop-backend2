const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  mascota: { type: String, required: true },
  servicio: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true }
}, { collection: "turnos" });

const Turno = mongoose.model("Turno", turnoSchema);

module.exports = Turno;
