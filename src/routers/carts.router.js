import { Router } from "express";
//import CartManager from "../managers/CartManager.js";
//import ProductManager from "../managers/ProductManager.js";
import {createCart, getCartById, addProductToCart, updateCartProducts, updateProductQuantity, deleteProductFromCart, emptyCart } from "../services/servicioCarrito.js";

const router = Router();
//const cm = new CartManager("./src/data/carts.json");
//const pm = new ProductManager("./src/data/products.json");

/// POST /api/carts -> crear carrito vacío
router.post("/", async (req, res) => {
  const cart = await createCart();
  res.status(201).json(cart);
});

// GET /api/carts/:cid -> carrito con populate
router.get("/:cid", async (req, res) => {
  const cart = await getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart);
});

// POST /api/carts/:cid/product/:pid -> agregar producto
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await addProductToCart(req.params.cid, req.params.pid);
  if (!cart) return res.status(404).json({ error: "Carrito o producto no encontrado" });
  res.json(cart);
});

// PUT /api/carts/:cid -> reemplazar arreglo completo
router.put("/:cid", async (req, res) => {
  const cart = await updateCartProducts(req.params.cid, req.body);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart);
});

// PUT /api/carts/:cid/products/:pid -> actualizar cantidad
router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;
  const cart = await updateProductQuantity(req.params.cid, req.params.pid, quantity);
  if (!cart) return res.status(404).json({ error: "Carrito o producto no encontrado" });
  res.json(cart);
});

// DELETE /api/carts/:cid/products/:pid -> eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await deleteProductFromCart(req.params.cid, req.params.pid);
  if (!cart) return res.status(404).json({ error: "Carrito o producto no encontrado" });
  res.json(cart);
});

// DELETE /api/carts/:cid -> vaciar carrito
router.delete("/:cid", async (req, res) => {
  const cart = await emptyCart(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart);
});

export default router;