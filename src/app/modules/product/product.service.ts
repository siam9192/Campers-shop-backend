import { Types } from 'mongoose';
import AppError from '../../Errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getProductsFromDB = async (query: any) => {
  const filter: any = {};

  const sort: any = {};

  const minPrice = parseInt(query.minPrice);
  const maxPrice = parseInt(query.maxPrice);
  const currentPage = parseInt(query.currentPage) || 1;
  const perPage = 6;
  if (query.name) {
    filter.name = query.name;
  }
  if (query.category) {
    filter.category = query.category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gt = minPrice;
    }
    if (maxPrice) {
      filter.price.$lt = maxPrice;
    }
  }

  if (parseInt(query.sort)) {
    sort.price = parseInt(query.sort);
  }

  if (query.q) {
    filter.$text = { $search: query.q };
  }
  filter.isDeleted = false;
  const result = await Product.find(filter)
    .sort(sort)
    .skip((currentPage - 1) * 6)
    .limit(perPage);
  const totalProduct = await Product.find(filter).countDocuments();
  return {
    products: result,
    totalProduct,
  };
};

const getProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const getRecommendedProductFromDB = async () => {
  const result = await Product.find({ isDeleted: false })
    .sort({ rating: -1 })
    .limit(8);
  return result;
};

const getUserCartProductsFromDB = async (payload: string[]) => {
  const ids = payload.map((id) => new Types.ObjectId(id));
  const result = await Product.find(
    { _id: { $in: [...ids] } },
    { _id: 1, name: 1, images: 1, category: 1, price: 1, stock: 1 },
  );
  return result;
};

const getFeaturedProductFromDB = async () => {
  const result = await Product.find({ isDeleted: false })
    .sort({ createAt: -1 })
    .limit(8);
  return result;
};
const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  // Checking is the product exist on database
  const product = await Product.isProductExists(id);
  if (!product) {
    throw new AppError(403, 'Product not found');
  }
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteProductIntoDB = async (id: string) => {
  const product = await Product.isProductExists(id);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return null;
};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDB,
  getRecommendedProductFromDB,
  getFeaturedProductFromDB,
  getUserCartProductsFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
