import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    code: {
      type: String,
      required: [true, "El código es obligatorio"],
      unique: true, 
      trim: true
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"]
    },
    status: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"]
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"]
    },
    thumbnails: {
      type: [String], 
      default: []
    }
  },
  {
    timestamps: true 
  }
);


productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model("products", productSchema);
