import express from "express";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import http from "http";
import path from "path"
import { fileURLToPath } from "url"
import { crearRouterVistas } from "./routes/vistasRouter.js"

import productsRouter from "./routers/products.router.js";
import  cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";

//instancias
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();
const http = require ("http").createServer(app); // servidor http basado en express
const io = new Server(server); //const io = require("socket.io")(http);

const PORT = 8080;

//Midlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public")); 

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/", crearRouterVistas())

// //Rutas
// app.use(`/api/products`, productsRouter);
// app.use(`/api/carts`, cartsRouter);
// app.use(`/`, viewsRouter); //realTimeProducts

//Configuración de socket
io.on("connection", (socket) => {
    console.log("Usuario conectado con websockets");
});

server.listen(PORT =>{
    console.log(`Servidor en el puerto ${PORT}`)
})

export default app
