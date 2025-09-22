import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { getProducts, createProduct, deleteProduct } from "./services/servicioProductos.js";

const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

io.on("connection", socket => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Evento clave: el cliente pide la lista de productos
  socket.on("productos:solicitar", async ({ page = 1, limit = 3 }) => {
    try {
      const productos = await getProducts({ page, limit });
      socket.emit("productos:lista", productos);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      socket.emit("estado:mensaje", {
        message: "Error al cargar los productos.",
        status: "error"
      });
    }
  });

  // Evento para crear un producto
  socket.on("producto:crear", async (datos) => {
    try {
      await createProduct(datos);
      const productosActualizados = await getProducts({ page: 1, limit: 3 });
      io.emit("productos:lista", productosActualizados);
      io.emit("estado:mensaje", {
        message: "Producto creado exitosamente.",
        status: "success"
      });
    } catch (err) {
      console.error("Error al crear el producto:", err);
      socket.emit("estado:mensaje", {
        message: "Error al crear el producto.",
        status: "error"
      });
    }
  });

  // Evento para eliminar un producto
  socket.on("producto:eliminar", async (id) => {
    try {
      await deleteProduct(id);
      const productosActualizados = await getProducts({ page: 1, limit: 3 });
      io.emit("productos:lista", productosActualizados);
      io.emit("estado:mensaje", {
        message: "Producto eliminado exitosamente.",
        status: "success"
      });
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      socket.emit("estado:mensaje", {
        message: "Error al eliminar el producto.",
        status: "error"
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const puerto = process.env.PUERTO || 8080;
server.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`);
});