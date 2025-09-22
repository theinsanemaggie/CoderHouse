import { Router } from "express";
import { fileURLToPath } from "url"; 
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../services/servicioProductos.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

//get --> obtener datos de los productos
// GET /api/products
router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const result = await getProducts({
    limit: parseInt(limit),
    page: parseInt(page),
    sort,
    query
  });
  res.json(result);
});

//obtiene por id
// GET /api/products/:id
router.get("/:pid", async (req, res) => {
  const product = await getProductById(req.params.pid);
  product ? res.json(product) : res.status(404).json({ error: "No encontrado" });
});

//post --> creamos un producto
// POST /api/products
router.post("/", async (req, res) => {
  const nuevo = await createProduct(req.body);
  res.status(201).json(nuevo);
});

//put --> actualizamos el producto
// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  const updated = await updateProduct(req.params.pid, req.body);
  res.json(updated);
});

//delete --> eliminar producto
// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  await deleteProduct(req.params.pid);
  res.json({ message: "Producto eliminado" });
});

export default router;