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
      filter.price.$gt = 0;
      filter.price.$lt = maxPrice;
    }
  }

  if (parseInt(query.sort)) {
    sort.price = parseInt(query.sort);
  }

  filter.isDeleted = false;

  const result = await Product.find(filter).sort(sort);

  return result;
};


const getProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const getRecommendedProductFromDB = async()=>{
    const result = await Product.find().sort({rating:-1}).limit(12)
    return result;
}


const updateProductIntoDB = async (id:string,payload:Partial<TProduct>)=>{

    // Checking is the product exist on database
    const product = await Product.isProductExists(id)
    if(!product){
        throw new AppError(403,"Product not found")
    }
    const result = await Product.findByIdAndUpdate(id,payload,{new:true})
    return result
}
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
  updateProductIntoDB,
  deleteProductIntoDB,
};
