import express from "express";
const app = express(); //instancia de express.
import productsRouter from "./routers/products.router.js";
import  cartsRouter from "./routers/carts.router.js";
const PORT = 8080;

//Middleware que express lea los json de los request.
app.use(express.json());

//Definición de rutas para los productos y carritos.
app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, cartsRouter);

app.listen(PORT =>{
    console.log(`Servidor en el puerto 8080`)
})