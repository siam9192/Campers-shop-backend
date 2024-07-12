import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidations } from './order.validation';
import { orderControllers } from './order.controller';

const router = Router();

router.post(
  '/',
  validateRequest(orderValidations.createOrderValidation),
  orderControllers.createOrder,
);

export const orderRoutes = router;
