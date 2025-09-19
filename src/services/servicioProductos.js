import { ProductModel } from "../models/Product.js";

export async function getProducts({ limit = 10, page = 1, sort, query }) {
  const filter = {};

  // Filtros
  if (query) {
    if (query === "available") {
      filter.status = true;
      filter.stock = { $gt: 0 };
    } else {
      filter.category = query; 
    }
  }

  // Ordenamiento
  const sortOption = sort === "asc" ? { price: 1 } :
                     sort === "desc" ? { price: -1 } : {};

  // Usamos paginate
  const options = {
    page,
    limit,
    sort: sortOption,
    lean: true
  };

  const result = await ProductModel.paginate(filter, options);

  return {
    status: "success",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}` : null,
    nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}` : null
  };
}


// import ProductManager from "../managers/ProductManager.js";

// const productManager = new ProductManager("./src/data/products.json");

// export async function obtenerProductos() {
//   return await productManager.getProducts();
// }

// export async function crearProducto(datos) {
//   return await productManager.addProduct({
//     title: datos?.nombre ?? datos?.title,
//     price: datos?.precio ?? datos?.price,
//     description: datos?.descripcion ?? datos?.description,
//     code: datos?.codigo ?? datos?.code,
//     stock: datos?.stock ?? 0,
//     category: datos?.categoria ?? datos?.category,
//     thumbnails: datos?.thumbnails ?? []
//   });
// }

// export async function eliminarProducto(id) {
//   return await productManager.deleteProduct(id);
// }

