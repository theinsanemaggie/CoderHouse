import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true // Asegura que no haya códigos de producto duplicados
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  thumbnails: {
    type: [String],
    default: []
  },
}, { timestamps: true });

// Añade el plugin de paginación
productSchema.plugin(mongoosePaginate);

// Crea el modelo a partir del esquema
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;