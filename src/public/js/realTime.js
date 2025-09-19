const socket = io();
const ul = document.getElementById("listaProductos");

function render(list) {
  ul.innerHTML = "";
  list.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.id} • ${p.name || p.title} • $${p.price}`;
    ul.appendChild(li);
  });
}

socket.on("productos:lista", data => {
  // si obtenerProductos devuelve promesa desde servidor, servidor se encarga
  render(data);
});

const formCrear = document.getElementById("formCrear");
formCrear?.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  socket.emit("producto:crear", { nombre, precio });
  formCrear.reset();
});

const formEliminar = document.getElementById("formEliminar");
formEliminar?.addEventListener("submit", e => {
  e.preventDefault();
  const idProducto = Number(document.getElementById("idProducto").value);
  socket.emit("producto:eliminar", idProducto);
  formEliminar.reset();
});