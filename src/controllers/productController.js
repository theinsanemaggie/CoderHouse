import { getProducts } from "../services/servicioProductos.js";

export async function mostrarInicio(req, res) {

  const { page = 1, limit = 3, sort, query } = req.query; 

  const productos = await getProducts({
    page: parseInt(page),
    limit: parseInt(limit),
    sort,
    query
  });

  console.log("Productos cargados:", productos);
  res.render("home", { titulo: "Inicio", productos });
}

export function mostrarTiempoReal(req, res) {
  res.render("realTimeProducts", { titulo: "Productos en Tiempo Real" });
}