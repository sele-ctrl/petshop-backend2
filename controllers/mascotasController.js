const Mascota = require("../models/Mascota");

const obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.render("mascotas", { mascotas });
  } catch (error) {
    res.status(500).send("Error al obtener mascotas");
  }
};

const agregarMascota = async (req, res) => {
  const { nombre, tipo, edad } = req.body;
  try {
    const nuevaMascota = new Mascota({ nombre, tipo, edad });
    await nuevaMascota.save();
    res.redirect("/vista-mascotas");
  } catch (error) {
    res.status(500).send("Error al agregar mascota");
  }
};

const buscarMascota = async (req, res) => {
  const { nombre } = req.query;
  try {
    const mascotas = await Mascota.find({ nombre: new RegExp(nombre, "i") });
    res.render("mascotas", { mascotas });
  } catch (error) {
    res.status(500).send("Error al buscar mascota");
  }
};

module.exports = {
  obtenerMascotas,
  agregarMascota,
  buscarMascota
};