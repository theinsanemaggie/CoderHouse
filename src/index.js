import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import { obtenerProductos, crearProducto, eliminarProducto } from "./src/services/servicioProductos.js";

const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

io.on("connection", socket => {
  console.log("Cliente conectado por sockets");

  // Emitir lista actual (obtener productos desde el servicio)
  (async () => {
    const productos = await obtenerProductos();
    socket.emit("productos:lista", productos);
  })();

  socket.on("producto:crear", async datos => {
    const creado = await crearProducto(datos);
    const productos = await obtenerProductos();
    io.emit("productos:lista", productos);
    socket.emit("producto:creado", creado);
  });

  socket.on("producto:eliminar", async idProducto => {
    await eliminarProducto(idProducto);
    const productos = await obtenerProductos();
    io.emit("productos:lista", productos);
    socket.emit("producto:eliminado", idProducto);
  });
});

const puerto = process.env.PUERTO || 8080;
server.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`);
});
