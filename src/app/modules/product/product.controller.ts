import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { productServices } from './product.service';
import { sendSuccessResponse } from '../../utils/response';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await productServices.createProductIntoDB(payload);
  const responseData = {
    statusCode: 201,
    message: 'Product created successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await productServices.getProductsFromDB(query);
  const responseData = {
    statusCode: 200,
    message: 'Products retrieved successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const getRecommendedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getRecommendedProductFromDB();
    const responseData = {
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: result,
    };

    sendSuccessResponse(res, responseData);
  },
);
const getFeaturedProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getFeaturedProductFromDB();
  const responseData = {
    statusCode: 200,
    message: 'Products retrieved successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productServices.getProductFromDB(id);
  const responseData = {
    statusCode: 201,
    message: 'Product retrieved successfully',
    data: result,
  };
  sendSuccessResponse(res, responseData);
});
const getUserCartProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await productServices.getUserCartProductsFromDB(payload);
  const responseData = {
    statusCode: 201,
    message: 'User cart Products retrieved successfully',
    data: result,
  };
  sendSuccessResponse(res, responseData);
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await productServices.updateProductIntoDB(id, payload);
  const responseData = {
    statusCode: 201,
    message: 'Product updated successfully',
    data: result,
  };
  sendSuccessResponse(res, responseData);
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productServices.deleteProductIntoDB(id);
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getProducts,
  getProduct,
  getUserCartProduct,
  getRecommendedProducts,
  getFeaturedProducts,
  updateProduct,
  deleteProduct,
};
