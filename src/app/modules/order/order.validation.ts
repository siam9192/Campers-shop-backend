import { z } from 'zod';

const createOrderValidation = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  product:z.string(),
  quantity:z.number(),
  paymentMethod:z.enum(["cash on","stripe"]),
 deliveryAddress:z.string()
});


export const orderValidations = {
    createOrderValidation
}