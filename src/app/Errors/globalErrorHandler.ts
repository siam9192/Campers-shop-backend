import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { HandleCastError } from './handleCastError';
import { HandleZodValidationError } from './handleZodValidationError';
import { HandleValidationError } from './handleValidationError';
import AppError from './AppError';
import { TErrorInterface, TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import config from '../config';
import { HandleDuplicateError } from './handleDuplicateError';

export const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: TErrorSource[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err?.name === 'CastError') {
    const errHandler = HandleCastError(err);
    statusCode = errHandler.statusCode;
    (message = errHandler.message), (errorMessages = errHandler.errorMessages);
  } else if (err?.code === 11000) {
    const errHandler = HandleDuplicateError(err);
    statusCode = errHandler?.statusCode;
    message = errHandler?.message;
    errorMessages = errHandler?.errorMessages;
  } else if (err instanceof ZodError) {
    const errHandler = HandleZodValidationError(err);
    statusCode = errHandler.statusCode;
    (message = errHandler.message), (errorMessages = errHandler.errorMessages);
  } else if (err?.name === 'ValidationError') {
    const errHandler = HandleValidationError(err);
    statusCode = errHandler.statusCode;
    (message = errHandler.message), (errorMessages = errHandler.errorMessages);
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};
