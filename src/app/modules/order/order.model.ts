import { model, Schema } from 'mongoose';
import { TOrder, TUser } from './order.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const orderSchema = new Schema<TOrder>({
  user: {
    type: userSchema,
    required: true,
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  canceled: {
    type: Boolean,
    default: false,
  },
});

export const Order = model<TOrder>('Order', orderSchema);
