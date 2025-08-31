import {promises as fs} from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";


//Configuración dirname en módulos
const __filename = fileURLToPath(import.meta.url); //url a rutas de archivo
const __dirname = path.dirname(__filename); //ruta de archivo a normal

class CartManager{
    constructor(filePath){
        this.path = path.resolve(__dirname, "...", __filename)
    }
    async getCarts(){
        try{
            const data =await fs.readFile(this.path, "utf-8")
            return JSON.parse(data)
        }catch{
            return []
        }
    }

    //creamos un carrito
    async createCart(){
        const carts = await this.getCarts()
        const newId = carts.lenth > 0 ? carts.at(-1).id + 1 : 1;
        
        const newCart ={
            id:newId,
            products: [] //vacío si no hay productos
        } 
        carts.push(newCart)
        await fs.writeFile(this.path, JSON.stringify(carts,null,2))
        return newCart
    }

    async getCartById(id){
        const carts = await this.getCarts()
        return carts.find (c => c.id === id)
    }

    //agregar producto al carrito
    async addProductToCart(cartId, productId){
        const carts = await this.getCarts()
        const cart = carts.find (c => c.id === cartId)

        if (!cart) return {error: "Carrito no encontrado"}

        const existingProduct = cart.products.find (p => p.product === productId) //¿El producto existe?
        if (existingProduct){
            existingProduct.quantity +=1;
        }else{
            cart.products.push({product:productId, quantity:1})
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2)) //Guardamos lo actualizado
        return cart;
    }

}
export default CartManager;