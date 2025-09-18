import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/product.json");

//get --> obtener datos de los productos
// GET /api/products
router.get("/", async(req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
})

//obtiene por id
// GET /api/products/:id
router.get("/:id", async(req, res)=>{
    const pid = req.params.id;
    const product = await productManager.getProductByid(pid);
    product ? res.json(product) : res.status(404).json({error: "Elemento no encontrado"});
})

//post --> creamos un producto
// POST /api/products
router.post("/", async(req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
})

//put --> actualizamos el producto
// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  const updated = await productManager.updateProduct(req.params.pid, req.body);
  if (updated?.error) return res.status(404).json(updated);
  res.json(updated);
});


//delete --> eliminar producto
// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  const result = await productManager.deleteProduct(req.params.pid);
  res.json(result);
});

export default router;
