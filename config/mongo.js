const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://petshop:admin1234@cluster0.xfebfuz.mongodb.net/petshopdb?retryWrites=true&w=majority&appName=PetshopCluster");
    console.log("Conectado a MongoDB Atlas con Mongoose");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

module.exports = { connectDB };

