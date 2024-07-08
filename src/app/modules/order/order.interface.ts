import { Types } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  phone: string;
};

export type TOrder = {
  user: TUser;
  product: Types.ObjectId;
  quantity: number;
  paymentMethod: 'cash on' | 'stripe';
  deliveryAddress: string;
  canceled?: boolean;
};
