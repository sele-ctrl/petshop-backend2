const express = require("express");
const app = express();
const PORT = 3000;

//pug
app.set("view engine", "pug");
app.set("views", "./views");


app.use(express.json());



const logger = require("./middlewares/logger");

app.use(express.json()); 
app.use(logger); 

//---------------------------------------------


const productosRoutes = require("./routes/productos");
app.use("/productos", productosRoutes);

const mascotasRoutes = require("./routes/mascotas");
app.use("/mascotas", mascotasRoutes);

const turnosRoutes = require("./routes/turnos");
app.use("/turnos", turnosRoutes);

//---------------------------------------------------

const { leerJSON } = require("./utils/fileHandler");
app.get("/vista-productos", async (req, res) => {
  const productos = await leerJSON("productos.json");
  res.render("productos", { productos });
});

app.get("/vista-mascotas", async (req, res) => {
  const mascotas = await leerJSON("mascotas.json");
  res.render("mascotas", { mascotas });
});

app.get("/vista-turnos", async (req, res) => {
  const turnos = await leerJSON("turnos.json");
  res.render("turnos", { turnos });
});




app.get("/", (req, res) => {
  res.render("index");
});//prueba http://localhost:3000/

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
