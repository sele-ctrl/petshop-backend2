const Turno = require("../models/Turno");
const { leerJSON, guardarJSON } = require("../utils/fileHandler");

const archivo = "turnos.json";

async function obtenerTurnos(req, res) {
    const turnos = await leerJSON(archivo);
    res.json(turnos);
}

async function agregarTurno(req, res) {
    const { mascota, servicio, fecha, hora } = req.body;
    const turnos = await leerJSON(archivo);
    const nuevo = new Turno(Date.now(), mascota, servicio, fecha, hora);
    turnos.push(nuevo);
    await guardarJSON(archivo, turnos);
    res.status(201).json(nuevo);
}

module.exports = {
    obtenerTurnos,
    agregarTurno
};
