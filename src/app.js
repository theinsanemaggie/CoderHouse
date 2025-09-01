import express from "express";
import {engine} from "express-handlebars";
import { createServer } from "http";
import {Server} from "socket.io";
import path from "path"
import { fileURLToPath } from "url"
import { crearRouterVistas } from "./routers/views.router.js"

import productsRouter from "./routers/products.router.js";
import  cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";

//instancias
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 8080;

const httpServer = createServer(app); // servidor http basado en express
const io = new Server(httpServer); //const io = require("socket.io")(http);


//Midlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public")); 

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/", crearRouterVistas())

//Configuración de socket
io.on("connection", (socket) => {
    console.log("Usuario conectado con websockets");
});

httpServer.listen(PORT, () =>{
    console.log(`Servidor en el puerto ${PORT}`)
})

export default app
