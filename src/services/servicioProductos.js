import { leerTodos, guardarUno, borrarPorId } from "../models/productoRepositorio.js"
import ProductManager from "../managers/ProductManager.js"

const productManager = new ProductManager("./src/data/products.json")

export async function obtenerProductos() {
  return await productManager.getProducts()
}

export async function crearProducto(datos) {
  const id = products.length > 0 ? products.at(-1).id + 1 : 1;
  const producto = {
    id,
    name: String(datos?.nombre || "").trim(),
    price: Number(datos?.precio || 0),
    description: String(datos?.descripcion || "").trim(),
    code: String(datos?.codigo || ""),
    status: true,
    stock: Number(datos?.stock || 0),
    category: String(datos?.categoria || "").trim(),
  }
  return await guardarUno(producto)
}

export async function eliminarProducto(id) {
  const identificador = typeof id === "string" ? Number(id) : id
  return await borrarPorId(identificador)
}
