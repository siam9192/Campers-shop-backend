import {Request,Response, NextFunction, Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validations';
import { productControllers } from './product.controller';
import { upload } from '../../utils/multer';

const router = Router();

router.post(
  '/',
  validateRequest(productValidations.createProductValidation),
  productControllers.createProduct,
);

router.get('/', productControllers.getProducts);
router.get('/recommended', productControllers.getRecommendedProducts);
router.get('/featured', productControllers.getFeaturedProducts);
router.post(`/my-cart`,productControllers.getUserCartProduct)
router.get('/:id', productControllers.getProduct);
router.put(
  '/:id',
  validateRequest(productValidations.updateProductValidation),
  productControllers.updateProduct,
);
router.delete('/:id', productControllers.deleteProduct);
export const productRoutes = router;
