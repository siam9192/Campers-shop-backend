import { Model, Types } from 'mongoose';

export type TProduct = {
_id?:Types.ObjectId
  name: string;
  images: Array<string>;
  description: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  isDeleted: boolean;
};

export interface TProductMethods extends Model<TProduct> {
  isProductExists: (id: string) => Promise<TProduct>;
}
