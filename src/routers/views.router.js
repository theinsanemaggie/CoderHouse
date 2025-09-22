import { Router } from "express";
import { getProducts } from "../services/servicioProductos.js";
import { getCartById } from "../services/servicioCarrito.js";

const router = Router();

// Ruta raíz -> lista de productos
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const productos = await getProducts({ limit, page, sort, query });

    res.render("home", {
      layout: "main",
      titulo: "Inicio - Catálogo",
      productos,
      limit,
      year: new Date().getFullYear()
    });
  } catch (err) {
    console.error("Error al cargar productos en /:", err);
    res.status(500).send("Error al cargar productos");
  }
});

// Vista productos con paginación
router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const productos = await getProducts({ limit, page, sort, query });

    res.render("home", {
      layout: "main",
      titulo: "Productos",
      productos,
      limit,
      year: new Date().getFullYear()
    });
  } catch (err) {
    console.error("Error al cargar productos en /products:", err);
    res.status(500).send("Error al cargar productos");
  }
});

// Vista realtimeproducts (websockets)
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    layout: "main",
    titulo: "Productos en Tiempo Real",
    year: new Date().getFullYear()
  });
});

// Vista carrito específico con populate
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);

    res.render("cart", {
      layout: "main",
      titulo: `Carrito ${req.params.cid}`,
      cart,
      year: new Date().getFullYear()
    });
  } catch (err) {
    console.error("Error al cargar carrito:", err);
    res.status(500).send("Error al cargar el carrito");
  }
});

export default router;
