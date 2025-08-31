import http from "http"
import { Server } from "socket.io"
import app from "./app.js"
import { obtenerProductos, crearProducto, eliminarProducto } from "./services/servicioProductos.js"

const servidorHttp = http.createServer(app)
const io = new Server(servidorHttp)

app.set("io", io)

io.on("connection", socket => {
  socket.emit("productos:lista", obtenerProductos())
  socket.on("producto:crear", datos => {
    const creado = crearProducto(datos)
    io.emit("productos:lista", obtenerProductos())
    socket.emit("producto:creado", creado)
  })
  socket.on("producto:eliminar", idProducto => {
    eliminarProducto(idProducto)
    io.emit("productos:lista", obtenerProductos())
    socket.emit("producto:eliminado", idProducto)
  })
})

const puerto = process.env.PUERTO || 8080
servidorHttp.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`)
})