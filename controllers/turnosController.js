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
  const { cliente, fecha } = req.body;
  try {
    const nuevoTurno = new Turno({ cliente, fecha });
    await nuevoTurno.save();
    res.redirect("/vista-turnos");
  } catch (error) {
    res.status(500).send("Error al agregar turno");
  }
};

module.exports = {
  obtenerTurnos,
  agregarTurno
};
