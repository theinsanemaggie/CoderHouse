let listaProductos = [  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },]

export function leerTodos() {
  return listaProductos
}

export function guardarUno(producto) {
  listaProductos.push(producto)
  return producto
}

export function borrarPorId(id) {
  listaProductos = listaProductos.filter(p => p.id !== id)
}