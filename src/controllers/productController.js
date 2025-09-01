import { obtenerProductos } from "../services/servicioProductos.js"

export function mostrarInicio(req, res) {
  const productos = obtenerProductos()
  res.render("home", { titulo: "Inicio", productos })
}

export function mostrarTiempoReal(req, res) {
  res.render("realTimeProducts", { titulo: "Productos en Tiempo Real" })
}
