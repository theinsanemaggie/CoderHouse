import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// dirname en módulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
  constructor(filePath) {
    this.path = path.resolve(__dirname, "..", filePath);
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const buscado = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
    return products.find(p => p.id === buscado);
  }

  async addProduct(productData) {
    const products = await this.getProducts();
    const newId = products.length > 0 ? products.at(-1).id + 1 : 1;

    const newProduct = {
      id: newId,
      title: productData.title || productData.name || "",
      name: productData.name || productData.title || undefined, // mantengo compatibilidad con tu repo
      description: productData.description || productData.descripcion || "",
      code: productData.code || productData.codigo || "",
      price: Number(productData.price ?? productData.precio ?? 0),
      status: productData.status ?? true,
      stock: Number(productData.stock ?? 0),
      category: productData.category || productData.categoria || "",
      thumbnails: productData.thumbnails || productData.thumbanails || []
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const buscado = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
    const index = products.findIndex(p => p.id === buscado);
    if (index === -1) return { error: `Producto no encontrado` };

    delete updates.id;
    products[index] = { ...products[index], ...updates };
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const buscado = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
    const updated = products.filter(p => p.id !== buscado);
    await fs.writeFile(this.path, JSON.stringify(updated, null, 2));
    return { message: `Producto ${id} eliminado` };
  }
}

export default ProductManager;
