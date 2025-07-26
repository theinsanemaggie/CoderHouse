import { Router } from "express";
const router = Router();

const cartManager = new cartManager("./src/data/carts.json");

// post--> crear un nuevo carrito
router.post("/", async (req, res)=>{
    const newCart = await cartManager.createCart()
    res.status(201).json(newCart) //devuelve el carrito creado
})

// get --> obtener los productos
router.get("/:id", async(req, res)=>{
    const cid = req.params.cid;
    const cart = await cartManager.getcartByid(cid)
    if(cart){
        res.json(cart.products) //array de productos
    }else{
        res.status(404).json({error: "El carrito no se encuentra"})
    }
})

router.post("/:cid/product/:pid", async(req,res)=>{
    const {cid, pid} = req.params;
    const result = await cartManager.addProductsCart(cid,pid)
    res.json(result) //devuelve error
})

export default router