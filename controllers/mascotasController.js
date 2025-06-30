const Mascota = require("../models/Mascota");

//-----------BAJO DE MONGODB-----------------------
async function obtenerMascotas(req, res) {
    try {
        const mascotas = await Mascota.find();
        res.json(mascotas);
    } catch (error) {
  console.error("Error en obtenerMascotas:", error); 
  res.status(500).json({ error: "Error al obtener mascotas" });
}

}

//------------------AGREGO---------------------
async function agregarMascota(req, res) {
    try {
        const { nombre, especie, raza, edad, zona, duenio } = req.body;
        const nueva = new Mascota({ nombre, especie, raza, edad, zona, duenio });
        await nueva.save();
        res.status(201).json(nueva);
    } catch (error) {
    res.status(500).json({ error: "Error al guardar la mascota" });
    }

}


//------------------BUSCO NOMBRE/ZONA--------------------
async function buscarMascota(req, res) {
    try {
        const { nombre, zona } = req.query;

        const filtro = {};
        if (nombre) filtro.nombre = new RegExp(`^${nombre}$`, "i"); //PROBLEMA CON MAYUSC AHORA NO PASA NADA
        if (zona) filtro.zona = new RegExp(`^${zona}$`, "i");

        const resultado = await Mascota.find(filtro);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar mascotas" });
    }
}

module.exports = {
    obtenerMascotas,
    agregarMascota,
    buscarMascota
};
