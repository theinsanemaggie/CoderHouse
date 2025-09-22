import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import viewsRouter from "./routers/views.router.js";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import uploadRouter from "./routers/upload.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const uri = "mongodb+srv://theinsanemaggie:tatakae@cluster0.xp7xfda.mongodb.net/";
mongoose.connect(uri)
  .then(() => {
    console.log("Conexión exitosa a la base de datos de MongoDB.");
  })
  .catch(err => {
    console.error("Error al conectar con la base de datos:", err);
  });
  
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));
console.log(`Sirviendo archivos estáticos desde: ${staticPath}`);

// Configuración de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routers
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/uploads", uploadRouter);

export default app;