import { ProductModel } from "../models/product.Model.js";

export async function getProducts(options = {}) {
  try {
    const { limit = 10, page = 1, sort, query } = options;
    const productos = await ProductModel.paginate(query || {}, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    });
    return productos;
  } catch (err) {
    console.error("Error al obtener productos:", err);
    throw err;
  }
}

export async function getProductById(productId) {
  try {
    return await ProductModel.findById(productId);
  } catch (err) {
    console.error("Error al obtener producto por ID:", err);
    throw err;
  }
}

export async function createProduct(productData) {
  try {
    return await ProductModel.create(productData);
  } catch (err) {
    console.error("Error al crear un producto:", err);
    throw err;
  }
}

export async function updateProduct(productId, updateData) {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
      throw new Error("Producto no encontrado para actualizar.");
    }
    return updatedProduct;
  } catch (err) {
    console.error("Error al actualizar el producto:", err);
    throw err;
  }
}

export async function deleteProduct(productId) {
  try {
    const result = await ProductModel.findByIdAndDelete(productId);
    if (!result) {
      throw new Error("Producto no encontrado.");
    }
    return result;
  } catch (err) {
    console.error("Error al eliminar el producto:", err);
    throw err;
  }
}