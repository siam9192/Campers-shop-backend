import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { orderServices } from './order.service';
import { sendSuccessResponse } from '../../utils/response';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await orderServices.createOrderIntoDB(payload);
  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'Order created successfully',
    data: result,
  });
});

export const orderControllers = {
  createOrder,
};
