import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { getProducts, createProduct, deleteProduct } from "./services/servicioProductos.js";

const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

io.on("connection", socket => {
  console.log("Cliente conectado por sockets");

  // Emitir lista actual (obtener productos desde el servicio)
  (async () => {
    const productos = await getProducts();
    socket.emit("productos:lista", productos);
  })();

  socket.on("producto:crear", async datos => {
    const creado = await createProduct(datos);
    const productos = await getProducts();
    io.emit("productos:lista", productos);
    socket.emit("producto:creado", creado);
  });

  socket.on("producto:eliminar", async idProducto => {
    await deleteProduct(idProducto);
    const productos = await getProducts();
    io.emit("productos:lista", productos);
    socket.emit("producto:eliminado", idProducto);
  });
});

const puerto = process.env.PUERTO || 8080;
server.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`);
});
