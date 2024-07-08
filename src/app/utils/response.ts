import { Response } from 'express';

type TResponseData = {
  statusCode: number;
  message: string;
  data: any;
};

export const sendSuccessResponse = (
  res: Response,
  responseData: TResponseData,
) => {
  res.status(responseData.statusCode).json({
    success: true,
    statusCode: responseData.statusCode,
    message: responseData.message,
    data: responseData.data,
  });
};

export const sendDataNotFoundResponse = (res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'No Data Found',
    data: [],
  });
};

export const sendNoAccessResponse = (res: Response) => {
  res.status(401).json({
    success: false,
    statusCode: 401,
    message: 'You have no access to this route',
  });
};
