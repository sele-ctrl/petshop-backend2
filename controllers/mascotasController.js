const Mascota = require("../models/Mascota");

//-----------BAJO DE MONGODB-----------------------
async function obtenerMascotas(req, res) {
    try {
        const mascotas = await Mascota.find();
        res.render("mascotas", { mascotas });
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
        res.redirect("/mascotas"); // ← CAMBIO IMPORTANTE
    } catch (error) {
        console.error("Error al guardar la mascota:", error);
        res.status(500).send("Error al guardar la mascota"); // ← También lo cambiamos para mantener consistencia
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

async function eliminarMascota(req, res) {
    try {
        const { id } = req.params;
        await Mascota.findByIdAndDelete(id);
        res.redirect("/mascotas");
    } catch (error) {
        console.error("Error al eliminar mascota:", error);
        res.status(500).send("Error al eliminar mascota");
    }
}


module.exports = {
    obtenerMascotas,
    agregarMascota,
    buscarMascota,
    eliminarMascota
};
