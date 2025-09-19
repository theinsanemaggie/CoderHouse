import { CartModel } from "../models/Cart.js";

// Crear carrito vacío
export async function createCart() {
  return await CartModel.create({});
}

// Obtener carrito con populate
export async function getCartById(id) {
  return await CartModel.findById(id).populate("products.product");
}

// Agregar producto al carrito
export async function addProductToCart(cid, pid) {
  const cart = await CartModel.findById(cid);
  if (!cart) return null;

  const existing = cart.products.find(p => p.product.toString() === pid);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();
  return await cart.populate("products.product");
}

// Reemplazar arreglo completo de productos
export async function updateCartProducts(cid, newProducts) {
  const cart = await CartModel.findByIdAndUpdate(
    cid,
    { products: newProducts },
    { new: true }
  ).populate("products.product");
  return cart;
}

// Actualizar cantidad de un producto
export async function updateProductQuantity(cid, pid, quantity) {
  const cart = await CartModel.findById(cid);
  if (!cart) return null;

  const item = cart.products.find(p => p.product.toString() === pid);
  if (!item) return null;

  item.quantity = quantity;
  await cart.save();
  return await cart.populate("products.product");
}

// Eliminar producto de un carrito
export async function deleteProductFromCart(cid, pid) {
  const cart = await CartModel.findByIdAndUpdate(
    cid,
    { $pull: { products: { product: pid } } },
    { new: true }
  ).populate("products.product");
  return cart;
}

// Vaciar carrito
export async function emptyCart(cid) {
  return await CartModel.findByIdAndUpdate(
    cid,
    { products: [] },
    { new: true }
  ).populate("products.product");
}
