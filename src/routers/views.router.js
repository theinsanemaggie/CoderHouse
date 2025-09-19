import { Router } from "express";
import { mostrarInicio, mostrarTiempoReal } from "../controllers/productController.js";

export function crearRouterVistas() {
  const router = Router();
  router.get("/", mostrarInicio);
  router.get("/realtimeproducts", mostrarTiempoReal);
  return router;
}

export default crearRouterVistas;
