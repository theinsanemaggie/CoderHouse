import express from `express`;
const app = express(); //instancia de express.
const productsRouter = require("./routers/products.router");
const cartsRouter = require("./routers/carts.router");
const PORT = 8080;

//Middleware que express lea los json de los request.
app.use(express.json());

//Definición de rutas para los productos y carritos.
app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, cartsRouter);

app.listen(PORT =>{
    console.log(`Servidor en el puerto ${PORT}`)
})