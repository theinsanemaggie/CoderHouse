import { getProducts } from "../services/servicioProductos.js";

export async function mostrarInicio(req, res) {
  const productos = await getProducts();
  console.log("Productos cargados:", productos);
  res.render("home", { titulo: "Inicio", productos });
}

export function mostrarTiempoReal(req, res) {
  res.render("realTimeProducts", { titulo: "Productos en Tiempo Real" });
}