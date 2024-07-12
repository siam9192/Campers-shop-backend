import { Router } from 'express';
import { productRoutes } from '../modules/product/product.route';
import { orderRoutes } from '../modules/order/order.route';

const router = Router();
const moduleRoutes: { path: string; routes: any }[] = [
  {
    path: '/products',
    routes: productRoutes,
  },
  {
    path: '/orders',
    routes: orderRoutes,
  },
];

moduleRoutes.forEach((ele) => {
  router.use(ele.path, ele.routes);
});

export default router;
