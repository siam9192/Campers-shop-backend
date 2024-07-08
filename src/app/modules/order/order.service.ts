import mongoose, { Types } from 'mongoose';
import AppError from '../../Errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { TProduct } from '../product/product.interface';

const createOrderIntoDB = async (payload: any) => {
  const product:TProduct = await Product.isProductExists(payload.product);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  if(product.stock < payload.quantity){
    throw new AppError(404, 'Stock not available');
  }
  const session = await mongoose.startSession()
  await session.startTransaction()


 try {
    const result = await Order.create([payload],{session});
    const updatedProduct = await Product.updateOne({_id:product._id},{$inc:{stock:-payload.quantity}},{session})
    
    if(!result || !updatedProduct.modifiedCount){
      throw new Error()
     }
    await session.commitTransaction()
    await session.endSession()
    return result;
 } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(403,"Order could not be accepted")
 }

};

export const orderServices = {
  createOrderIntoDB,
};
