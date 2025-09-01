let listaProductos = [
  { id: 1, name: "Buzo Algodón", price: 12000 },
  { id: 2, name: "Zapatillas Deportivas", price: 45000 }
]

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

