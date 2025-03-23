import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    console.error("Erro inesperado:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Erro interno do servidor.",
    });
  }
}

export default errorHandler;
