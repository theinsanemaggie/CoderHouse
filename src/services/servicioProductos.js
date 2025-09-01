import { leerTodos, guardarUno, borrarPorId } from "../models/productoRepositorio.js"

export function obtenerProductos() {
  return leerTodos()
}

export function crearProducto(datos) {
  const id = Date.now()
  const name = String(datos?.nombre || "").trim()
  const price = Number(datos?.precio || 0)
  const producto = { id, name, price }
  return guardarUno(producto)
}

export function eliminarProducto(id) {
  const identificador = typeof id === "string" ? Number(id) : id
  borrarPorId(identificador)
}
