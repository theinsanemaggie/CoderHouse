import express from "express";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import http from "http";

import productsRouter from "./routers/products.router.js";
import  cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";

//instancias
const app = express();
const http = require ("http").createServer(app); // servidor http basado en express
const io = new Server(server); //const io = require("socket.io")(http);

const PORT = 8080;

//Midlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public")); 

//Rutas
app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, cartsRouter);
app.use(`/`, viewsRouter); //realTimeProducts

//Configuración de socket
io.on("connection", (socket) => {
    console.log("Usuario conectado con websockets");
});

server.listen(PORT =>{
    console.log(`Servidor en el puerto ${PORT}`)
})

export { io };