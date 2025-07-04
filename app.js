const express = require("express");
const { connectDB } = require('./config/mongo');
const session = require("express-session");
const path = require('path');
const { requiereLogin } = require("./middlewares/auth");
const logger = require("./middlewares/logger");

const usuariosRoutes = require("./routes/usuarios");
const productosRoutes = require("./routes/productos");
const mascotasRoutes = require("./routes/mascotas");
const turnosRoutes = require("./routes/turnos");

const Mascota = require("./models/Mascota");
const Turno = require("./models/Turno");
const Producto = require("./models/Producto");

const app = express();
const PORT = 3000;

// PUG
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secreto123",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

const sessionToViews = require('./middlewares/sessionToViews');
app.use(sessionToViews);

app.use((req, res, next) => {
  console.log("Sesión actual:", req.session);
  next();
});

// Rutas
app.use("/productos", productosRoutes);
app.use("/mascotas", mascotasRoutes);
app.use("/turnos", turnosRoutes);
app.use("/usuario", usuariosRoutes);

// Redirección /login
app.get("/login", (req, res) => {
  res.redirect("/usuario/login");
});

// Vistas protegidas
app.get("/vista-mascotas", requiereLogin, async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.render("mascotas", { mascotas });
  } catch (error) {
    res.status(500).send("Error al cargar mascotas");
  }
});

app.get("/vista-turnos", requiereLogin, async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.render("turnos", { turnos });
  } catch (error) {
    res.status(500).send("Error al cargar turnos");
  }
});

app.get("/vista-productos", requiereLogin, async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render("productos", { productos });
  } catch (error) {
    res.status(500).send("Error al cargar productos");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Error al cerrar sesión");
    res.redirect("/usuario/login");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("No se pudo conectar a MongoDB:", error);
});

