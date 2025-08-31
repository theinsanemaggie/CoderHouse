//views.router --> renderizar vistas con handlebars

import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// Home
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

// Real time products
router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
