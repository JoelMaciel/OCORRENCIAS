import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { z } from "zod";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      res.status(400).json({ statusCode: 400, message: errorMessages });
    } else {
      res.status(500).json({
        statusCode: 500,
        message: "Erro interno do servidor.",
      });
    }
  }
}

export default errorHandler;
