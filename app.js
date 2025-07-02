const express = require("express");
const { connectDB } = require('./config/mongo');
const logger = require("./middlewares/logger");
const session = require("express-session");
const path = require('path');
const { requiereLogin } = require("./middlewares/auth");



const usuariosRoutes = require("./routes/usuarios");
const productosRoutes = require("./routes/productos");
const mascotasRoutes = require("./routes/mascotas");
const turnosRoutes = require("./routes/turnos");

const Mascota = require("./models/Mascota");

const app = express();
const PORT = 3000;

//------------------pug----------------------
app.set("view engine", "pug");
app.set("views", "./views");

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


//------------------rutas----------------------
app.use("/productos", productosRoutes);
app.use("/mascotas", mascotasRoutes);
app.use("/turnos", turnosRoutes);
app.use("/usuario", usuariosRoutes);

// ----redireccionar /login a /usuario/login------

app.get("/login", (req, res) => {
  res.redirect("/usuario/login");
});



//---------------MONGOBS BIEN MASCOTAS-----------------------
app.get("/vista-mascotas", requiereLogin, async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.render("mascotas", { mascotas });
  } catch (error) {
    res.status(500).send("Error al cargar mascotas");
  }
});
//---------------MONGOBS BIEN turno-----------------------
const Turno = require("./models/Turno");

app.get("/vista-turnos", requiereLogin, async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.render("turnos", { turnos });
  } catch (error) {
    console.error("Error al cargar turnos:", error);
    res.status(500).send("Error al cargar turnos");
  }
});

//---------------MONGOBS BIEN PRODUCTO-----------------------
const Producto = require("./models/Producto");

app.get("/vista-productos", requiereLogin, async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render("productos", { productos });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.status(500).send("Error al cargar productos");
  }
});

app.get("/perfil", requiereLogin, (req, res) => {
  res.send(`Bienvenido/a ${req.session.usuario}`);
});


app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send("Error al cerrar sesión");
    }
    res.redirect("/usuario/login");
  });
});


app.get("/", (req, res) => {
  res.render("index");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a MongoDB:", error);

  });
