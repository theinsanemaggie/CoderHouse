import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/product.json");

//get --> obtener datos de los productos

router.get("/", async(req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
})

//obtiene por id
router.get("/:id", async(req, res)=>{
    const pid = req.params.id;
    const product = await productManager.getProductByid(pid);
    product ? res.json(product) : res.status(404).json({error: "Elemento no encontrado"});
})

//post --> creamos un producto

router.post("/", async(req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
})

//put --> actualizamos el producto
router.put("/:pid", async (req, res) => {
    const updated = await productManager.updateProduct(req.params.pid, res.body);
    res.json(updated);
})

//delete --> eliminar producto
router.delete("/:pid", async (req, res) => {
    const result = await productManager.deleteProduct(req.params.pid);
    res.json(result);
})

export default router;