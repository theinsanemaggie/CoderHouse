import { ProductModel } from "../models/product.Model.js";

export async function getProducts(options = {}) {
  try {
    const { limit = 10, page = 1, sort, query } = options;

    const result = await ProductModel.paginate(query || {}, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      lean: true,
    });

    return {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
    };
  } catch (err) {
    console.error("Error al obtener productos:", err);
    throw err;
  }
}

export async function getProductById(productId) {
  try {
    return await ProductModel.findById(productId).lean();
  } catch (err) {
    console.error("Error al obtener producto por ID:", err);
    throw err;
  }
}

export async function createProduct(productData) {
  try {
    return await ProductModel.create(productData);
  } catch (err) {
    console.error("Error al crear producto:", err);
    throw err;
  }
}

export async function updateProduct(productId, updateData) {
  try {
    return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true, lean: true });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    throw err;
  }
}

export async function deleteProduct(productId) {
  try {
    return await ProductModel.findByIdAndDelete(productId);
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    throw err;
  }
}
