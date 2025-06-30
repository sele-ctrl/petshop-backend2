const Turno = require("../models/Turno");

//---------------------BAJO TURNOS-----------------------
async function obtenerTurnos(req, res) {
    try {
        const turnos = await Turno.find();
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener turnos" });
    }
}

//--------------------------AGREGO TURNO2----------------------

async function agregarTurno(req, res) {
    try {
        const { fecha, hora, mascota, servicio } = req.body;
        const nuevo = new Turno({ fecha, hora, mascota, servicio });
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        console.error("Error al guardar el turno:", error);
        res.status(500).json({ error: "Error al guardar el turno" });
    }
}

module.exports = { obtenerTurnos, agregarTurno };
