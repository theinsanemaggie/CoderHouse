const socket = io();
const productGrid = document.getElementById("listaProductos");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageInfo = document.getElementById("pageInfo");
const productContainer = document.getElementById("productContainer");
const emptyState = document.getElementById("emptyState");
const formCrear = document.getElementById("formCrear");
const formEliminar = document.getElementById("formEliminar");
const statusMessage = document.getElementById("statusMessage");

let currentPage = 1;

// Esta función se encarga de dibujar los productos en la vista
function render(data) {
  // Verificamos si la data y los productos existen
  if (!data || !data.payload || data.payload.length === 0) {
    productContainer.style.display = "none";
    emptyState.style.display = "block";
    return;
  }
  
  productGrid.innerHTML = "";
  productContainer.style.display = "block";
  emptyState.style.display = "none";

  data.payload.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const imgUrl = (p.thumbnails && p.thumbnails.length > 0) 
      ? p.thumbnails[0] 
      : "https://via.placeholder.com/300x200?text=Sin+imagen";

    card.innerHTML = `
      <img src="${imgUrl}" alt="${p.title || 'Producto'}" />
      <h3>${p.title || ''}</h3>
      <p><strong>Código:</strong> ${p.code || ''}</p>
      <p><strong>Stock:</strong> ${p.stock ?? 'N/A'}</p>
      <p><strong>Precio:</strong> $${p.price ?? 'N/A'}</p>
    `;
    productGrid.appendChild(card);
  });
  
  pageInfo.textContent = `Página ${data.page} de ${data.totalPages}`;
  prevPageBtn.style.display = data.hasPrevPage ? "inline-block" : "none";
  nextPageBtn.style.display = data.hasNextPage ? "inline-block" : "none";
  currentPage = data.page;
}

function showStatusMessage(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  setTimeout(() => {
    statusMessage.textContent = "";
    statusMessage.className = "status-message";
  }, 5000);
}

socket.on("connect", () => {
  // Cuando se conecta el cliente, pide la lista de productos
  socket.emit("productos:solicitar", { page: 1, limit: 3 });
});

socket.on("productos:lista", data => {
  render(data);
});

socket.on("estado:mensaje", data => {
  showStatusMessage(data.message, data.status);
});

if (prevPageBtn) {
  prevPageBtn.addEventListener("click", e => {
    e.preventDefault();
    socket.emit("productos:solicitar", { page: currentPage - 1, limit: 3 });
  });
}

if (nextPageBtn) {
  nextPageBtn.addEventListener("click", e => {
    e.preventDefault();
    socket.emit("productos:solicitar", { page: currentPage + 1, limit: 3 });
  });
}

if (formCrear) {
  formCrear.addEventListener("submit", async e => {
    e.preventDefault();

    const title = document.getElementById("nombre").value;
    const description = document.getElementById("descripcion").value;
    const code = document.getElementById("codigo").value;
    const price = Number(document.getElementById("precio").value);
    const stock = Number(document.getElementById("stock").value);
    const category = document.getElementById("categoría").value;
    const status = document.getElementById("estado").value === "true";
    const thumbnailFile = document.getElementById("thumbnails").files[0];

    if (!title || !description || !code || !price || !stock || !category || !thumbnailFile) {
        showStatusMessage("Completar todos los campos obligatorios.", "error");
        return;
    }

    let thumbnailUrl = '';
    if (thumbnailFile) {
      const formData = new FormData();
      formData.append('imagen', thumbnailFile);
      
      try {
        const response = await fetch('/api/uploads', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          thumbnailUrl = data.url;
        } else {
          showStatusMessage('Error al subir la imagen', 'error');
          return;
        }
      } catch (err) {
        showStatusMessage('Error de red al subir la imagen.', 'error');
        return;
      }
    }

    socket.emit("producto:crear", {
      title,
      description,
      code,
      price,
      stock,
      category,
      status,
      thumbnails: [thumbnailUrl]
    });

    formCrear.reset();
  });
}

if (formEliminar) {
  formEliminar.addEventListener("submit", e => {
    e.preventDefault();
    const idProducto = document.getElementById("idProducto").value;
    socket.emit("producto:eliminar", idProducto);
    formEliminar.reset();
  });
}