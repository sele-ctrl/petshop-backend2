const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://petshop:user123@petshopcluster.hhqo8ca.mongodb.net/?retryWrites=true&w=majority&appName=PetshopCluster", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB Atlas con Mongoose");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error; //corta
  }
}

module.exports = { connectDB };
