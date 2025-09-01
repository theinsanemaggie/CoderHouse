import { leerTodos, guardarUno, borrarPorId } from "../models/productosRepositorio.js"

export function obtenerProductos() {
  return leerTodos()
}

export function crearProducto(datos) {
  const id = Date.now()
  const nombre = String(datos?.nombre || "").trim()
  const precio = Number(datos?.precio || 0)
  const producto = { id, nombre, precio }
  return guardarUno(producto)
}

export function eliminarProducto(id) {
  const identificador = typeof id === "string" ? Number(id) : id
  borrarPorId(identificador)
}
