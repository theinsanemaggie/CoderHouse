import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager("./src/data/products.json");

export async function obtenerProductos() {
  return await productManager.getProducts();
}

export async function crearProducto(datos) {
  return await productManager.addProduct({
    title: datos?.nombre ?? datos?.title,
    price: datos?.precio ?? datos?.price,
    description: datos?.descripcion ?? datos?.description,
    code: datos?.codigo ?? datos?.code,
    stock: datos?.stock ?? 0,
    category: datos?.categoria ?? datos?.category,
    thumbnails: datos?.thumbnails ?? []
  });
}

export async function eliminarProducto(id) {
  return await productManager.deleteProduct(id);
}

