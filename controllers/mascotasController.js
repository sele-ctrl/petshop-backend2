const Mascota = require("../models/Mascota");
const { leerJSON, guardarJSON } = require("../utils/fileHandler");

const archivo = "mascotas.json";

async function obtenerMascotas(req, res) {
    const mascotas = await leerJSON(archivo);
    res.json(mascotas);
}

async function agregarMascota(req, res) {
    const { nombre, especie, raza, edad, zona, duenio } = req.body;
    const mascotas = await leerJSON(archivo);
    const nueva = new Mascota(Date.now(), nombre, especie, raza, edad, zona, duenio);
    mascotas.push(nueva);
    await guardarJSON(archivo, mascotas);
    res.status(201).json(nueva);
}

async function buscarMascota(req, res) {
    const { nombre, zona } = req.query;
    const mascotas = await leerJSON(archivo);

    let resultado = mascotas;

    if (nombre) {
        resultado = resultado.filter(m =>
            m.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

    if (zona) {
        resultado = resultado.filter(m =>
            m.zona.toLowerCase() === zona.toLowerCase()
    );
  }

    res.json(resultado);
}

module.exports = {
    obtenerMascotas,
    agregarMascota,
    buscarMascota
};
