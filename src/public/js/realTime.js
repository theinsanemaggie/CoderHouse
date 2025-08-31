const socket = io()
const ul = document.getElementById("listaProductos")

function render(list) {
  ul.innerHTML = ""
  list.forEach(p => {
    const li = document.createElement("li")
    li.textContent = `${p.id} • ${p.name} • $${p.price}`
    ul.appendChild(li)
  })
}

socket.on("productos:list", renderizar)
const formCrear = document.getElementById("formCrear")

formCrear.addEventListener("submit", e => {
  e.preventDefault()
  const nombre = document.getElementById("nombre").value
  const precio = document.getElementById("precio").value
  socket.emit("producto:crear", { nombre, precio })
  formCrear.reset()
})

const formEliminar = document.getElementById("formEliminar")

formEliminar.addEventListener("submit", e => {
  e.preventDefault()
  const idProducto = document.getElementById("idProducto").value
  socket.emit("producto:eliminar", Number(idProducto))
  formEliminar.reset()
})

