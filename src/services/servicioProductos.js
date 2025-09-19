import ProductModel from "../models/product.Model.js";

// GET con filtros, paginación y sort
export async function getProducts({ limit = 10, page = 1, sort, query }) {
  const filter = {};

  if (query) {
    if (query === "available") {
      filter.status = true;
      filter.stock = { $gt: 0 };

    } else {
      filter.category = query;
    }
  }

  const sortOption = sort === "asc" ? { price: 1 } :
                     sort === "desc" ? { price: -1 } : {};

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

// GET product by ID
export async function getProductById(id) {
  return await ProductModel.findById(id);
}

// POST create product
export async function createProduct(data) {
  return await ProductModel.create(data);
}

// PUT update product
export async function updateProduct(id, updates) {
  return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
}

// DELETE product
export async function deleteProduct(id) {
  return await ProductModel.findByIdAndDelete(id);
}
