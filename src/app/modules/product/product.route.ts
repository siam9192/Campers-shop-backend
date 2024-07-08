import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validations';
import { productControllers } from './product.controller';

const router = Router();

router.post(
  '/',
  validateRequest(productValidations.createProductValidation),
  productControllers.createProduct,
);

router.get('/', productControllers.getProducts);
router.get('/:id', productControllers.getProduct);
router.put("/:id",validateRequest(productValidations.updateProductValidation),productControllers.updateProduct)
router.delete('/:id', productControllers.deleteProduct);
export const productRoutes = router;
