const Turno = require("../models/Turno");

const obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.render("turnos", { turnos });
  } catch (error) {
    res.status(500).send("Error al obtener turnos");
  }
};

const agregarTurno = async (req, res) => {
  const { mascota, servicio, fecha, hora } = req.body;
  try {
    const nuevoTurno = new Turno({ mascota, servicio, fecha, hora });
    await nuevoTurno.save();

    // Emitir evento al cliente con el nuevo turno
    req.io.emit("nuevoTurno", nuevoTurno);

    res.redirect("/vista-turnos");
  } catch (error) {
    res.status(500).send("Error al agregar turno");
  }
};

module.exports = {
  obtenerTurnos,
  agregarTurno
};
