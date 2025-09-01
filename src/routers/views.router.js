//views.router --> renderizar vistas con handlebars

import { Router } from "express";
import { mostrarInicio, mostrarTiempoReal } from "../controllers/productController.js"
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

//  Home
// router.get("/", async (req, res) => {
//   const products = await productManager.getProducts();
//   res.render("home", { products });
// });

// Real time products
export function crearRouterVistas() {
  const router = Router()
  router.get("/", mostrarInicio)
  router.get("/realTimeProducts", mostrarTiempoReal)
  return router
}


export default router;
