import { z } from 'zod';

const createProductValidation = z.object({
  name: z.string(),
  images: z
    .array(z.string())
    .nonempty({ message: 'image must be required' })
    .optional(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
  rating: z.number().max(5),
});

const updateProductValidation = createProductValidation.partial();

export const productValidations = {
  createProductValidation,
  updateProductValidation,
};
