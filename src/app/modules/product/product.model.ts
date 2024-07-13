import { model, Schema } from 'mongoose';
import { TProduct, TProductMethods } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.statics.isProductExists = async (id) => {
  return await Product.findById(id);
};

productSchema.index({
  name: 'text',
  description: 'text',
});

export const Product = model<TProduct, TProductMethods>(
  'Product',
  productSchema,
);
