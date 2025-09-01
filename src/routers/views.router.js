//views.router --> renderizar vistas con handlebars

import { Router } from "express";
import { mostrarInicio, mostrarTiempoReal } from "../controllers/productController.js"
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// Real time products
export function crearRouterVistas() {
  const router = Router()
  router.get("/", mostrarInicio)
  router.get("/realTimeProducts", mostrarTiempoReal)
  return router
}


export default router;
