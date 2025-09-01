let listaProductos = [
  { id: 1, nombre: "Buzo Algodón", precio: 12000 },
  { id: 2, nombre: "Zapatillas Deportivas", precio: 45000 }
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

