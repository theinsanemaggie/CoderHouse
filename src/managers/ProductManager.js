import {promises as fs} from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

//Configuración dirname en módulos
const __filename = fileURLToPath(import.meta.url); //url a rutas de archivo
const __dirname = path.dirname(__filename); //ruta de archivo a normal

class ProductManager{ 
    constructor(filePath){
        this.path = path.resolve(__dirname, "..", filePath);
    }

    async getProducts(){
        try{
            const data = await fs.readFile(this.path, "utf-8")
            return JSON.parse(data)
        }catch{
            return []
        }
    }

    async getproductsByid(id){
        const products = await this.getProducts
        return products.find( p => p.id === id)
    }

    async addProduct(productData){
        const products = await this.getProducts()
        //id autoincremental
        const newId = products.length > 0 ? products.at(-1).id + 1 : 1;
        const newProduct = {
            
            id: newId,
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
            status: productData.status ?? true,
            stock: productData.stock,
            category: productData.category,
            thumbanails: productData-thumbnails || []


        }
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products,null,2))
        return newProduct;
    }
    
    async updateProduct(id,updates){
        const products = await this.getProducts() //obtenemos los productos
        const index = products.findIndex(p => id === id) // busca el producto según el id
        if (index === -1) return {error: `Producto no encontrado`}

        delete updates.id; //eliminar el campo id del objeto update para evitar duplicados y que el user lo modifique
        products[index] = {... products [index], ...updates}
        await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        return products[index]
    }

    async deleteProduct(id){
        const products = await this.getProducts()
        const updated = products.filter(p => p.id != id);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        return {message: `Producto ${id} eliminado`}
    }
}

export default ProductManager;