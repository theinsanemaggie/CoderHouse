import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const cm = new CartManager("./src/data/carts.json");
const pm = new ProductManager("./src/data/products.json");

// post--> crear un nuevo carrito
router.post("/", async (req, res) => {
  const newCart = await cm.createCart();
  res.status(201).json(newCart); //devuelve el carrito creado
});

// get --> obtener los productos
router.get("/:cid", async (req, res) => {
  const cart = await cm.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "El carrito no se encuentra" });
  res.json(cart);
});

// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cm.addProductToCart(cid, pid, pm);
  if (result?.error) return res.status(400).json(result);
  res.json(result);
});

// DELETE /api/carts/:cid/products/:pid -> eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cm.deleteProductFromCart(cid, pid);
  if (result?.error) return res.status(404).json(result);
  res.json(result);
});


// PUT /api/carts/:cid -> reemplazar arreglo completo
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const newProducts = req.body;
  if (!Array.isArray(newProducts)) return res.status(400).json({ error: "Error al actualizar el carrito" });
  const result = await cm.updateCartProducts(cid, newProducts);
  if (result?.error) return res.status(404).json(result);
  res.json(result);
});

// PUT /api/carts/:cid/products/:pid -> actualizar solo cantidad
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  if (typeof quantity !== "number") return res.status(400).json({ error: "Error al actualizar el carrito" });
  const result = await cm.updateProductQuantity(cid, pid, quantity);
  if (result?.error) return res.status(404).json(result);
  res.json(result);
});

// DELETE /api/carts/:cid -> vaciar carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const result = await cm.emptyCart(cid);
  if (result?.error) return res.status(404).json(result);
  res.json(result);
});

export default router;