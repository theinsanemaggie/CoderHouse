import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import crearRouterVistas from "./routers/views.router.js";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const uri = "mongodb+srv://theinsanemaggie:tatakae@cluster0.xp7xfda.mongodb.net/"

//devuelve promesa y usamos then y catch para manejo de errores
mongoose.connect(uri)
  .then(() => {
    console.log("Conexión exitosa a la base de datos de MongoDB.");
  })
  .catch(err => {
    console.error("Error al conectar con la base de datos:", err);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", crearRouterVistas());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

export default app;
