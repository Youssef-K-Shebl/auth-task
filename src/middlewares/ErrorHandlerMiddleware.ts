import { NextFunction, Request, Response } from "express";
import ExposableError from "../error/ExposableError";
import { constants } from "http2";
export default abstract class ErrorHandlerMiddleware {
  public static exposableErrorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    if (error instanceof ExposableError) {
      console.log(`Exposable Error: ${error.message}`);
      response.status(error.statusCode).json({
        success: false,
        message: error.message,
        details: error.details,
        data: null,
      });
      return;
    }
    next(error);
  };

  public static errorHandler = (error: any, request: Request, response: Response, next: NextFunction): void => {
    if (error instanceof Error) {
      console.log(`Internal Server Error: ${error.message}`);
      response
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal Server Error", data: null });
    }
  };
}
