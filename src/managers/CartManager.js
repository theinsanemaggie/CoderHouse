// src/managers/CartManager.js
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// dirname en módulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartManager {
  constructor(filePath) {
    this.path = path.resolve(__dirname, "..", filePath);
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length > 0 ? carts.at(-1).id + 1 : 1;

    const newCart = {
      id: newId,
      products: []
    };

    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const buscado = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
    return carts.find(c => c.id === buscado);
  }

  // requiere productManager para validar existencia
  async addProductToCart(cartId, productId, productManager) {
    const carts = await this.getCarts();
    const buscadoCart = typeof cartId === "string" && /^\d+$/.test(cartId) ? Number(cartId) : cartId; //¿Es un string? ¿Contiene sólo dígitos?
    const buscadoProd = typeof productId === "string" && /^\d+$/.test(productId) ? Number(productId) : productId;

    const cart = carts.find(c => c.id === buscadoCart);
    if (!cart) return { error: "Carrito no encontrado" };

    // validar producto con ProductManage
    if (productManager) {
      const product = await productManager.getProductById(buscadoProd);
      if (!product) return { error: "Producto no encontrado" };
    }

    const existingProduct = cart.products.find(p => p.product === buscadoProd || p.product === String(buscadoProd));
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: buscadoProd, quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }

  // Actualizar todos los productos del carrito (reemplazar el arreglo)
  async updateCartProducts(cartId, newProducts = []) {
    const carts = await this.getCarts();
    const buscadoCart = typeof cartId === "string" && /^\d+$/.test(cartId) ? Number(cartId) : cartId;
    const index = carts.findIndex(c => c.id === buscadoCart);
    if (index === -1) return { error: "Carrito no encontrado" };

    carts[index].products = newProducts;
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return carts[index];
  }

  // Actualizar cantidad de producto
  async updateProductQuantity(cartId, productId, quantity) {
    const carts = await this.getCarts();
    const buscadoCart = typeof cartId === "string" && /^\d+$/.test(cartId) ? Number(cartId) : cartId;
    const buscadoProd = typeof productId === "string" && /^\d+$/.test(productId) ? Number(productId) : productId;

    const index = carts.findIndex(c => c.id === buscadoCart);
    if (index === -1) return { error: "Carrito no encontrado" };

    const prod = carts[index].products.find(p => p.product === buscadoProd || p.product === String(buscadoProd));
    if (!prod) return { error: "Producto no encontrado en el carrito" };

    prod.quantity = quantity;
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return carts[index];
  }

  // Eliminar un producto del carrito
  async deleteProductFromCart(cartId, productId) {
    const carts = await this.getCarts();
    const buscadoCart = typeof cartId === "string" && /^\d+$/.test(cartId) ? Number(cartId) : cartId;
    const buscadoProd = typeof productId === "string" && /^\d+$/.test(productId) ? Number(productId) : productId;

    const index = carts.findIndex(c => c.id === buscadoCart);
    if (index === -1) return { error: "Carrito no encontrado" };

    carts[index].products = carts[index].products.filter(p => p.product !== buscadoProd && p.product !== String(buscadoProd));
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return carts[index];
  }

  // Vaciar carrito
  async emptyCart(cartId) {
    const carts = await this.getCarts();
    const buscadoCart = typeof cartId === "string" && /^\d+$/.test(cartId) ? Number(cartId) : cartId;
    const index = carts.findIndex(c => c.id === buscadoCart);
    if (index === -1) return { error: "Carrito no encontrado" };

    carts[index].products = [];
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return carts[index];
  }
}

export default CartManager;
