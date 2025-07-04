const Turno = require("../models/Turno");

// Mostrar turnos en la vista Pug
async function obtenerTurnos(req, res) {
    try {
        const turnos = await Turno.find();
        res.render("turnos", { turnos }); // Cambiado de res.json() a res.render()
    } catch (error) {
        console.error("Error al obtener turnos:", error);
        res.status(500).send("Error al obtener turnos");
    }
}

// Agregar turno desde el formulario HTML
async function agregarTurno(req, res) {
    try {
        const { fecha, hora, mascota, servicio } = req.body;
        const nuevo = new Turno({ fecha, hora, mascota, servicio });
        await nuevo.save();
        res.redirect("/turnos"); // Redirige a la vista
    } catch (error) {
        console.error("Error al guardar el turno:", error);
        res.status(500).send("Error al guardar el turno");
    }
}

// Eliminar turno por ID
async function eliminarTurno(req, res) {
    try {
        await Turno.findByIdAndDelete(req.params.id);
        res.redirect("/turnos");
    } catch (error) {
        console.error("Error al eliminar el turno:", error);
        res.status(500).send("Error al eliminar el turno");
    }
}

module.exports = { obtenerTurnos, agregarTurno, eliminarTurno };

