const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especie: { type: String, required: true },
  raza: { type: String },
  edad: { type: Number },
  zona: { type: String },
  duenio: { type: String }
}, { collection: 'mascotas' });

const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;

