import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarArmaUseCase } from "../usecases/arma/criar-arma";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateArmaSchema } from "../dtos/schemas/CreateArmaSchema";
import { BuscarArmaUseCase } from "../usecases/arma/buscar-arma";
import { AtualizaArmaUseCase } from "../usecases/arma/atualizar-arma";

export class ArmasController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarArmaUseCase = container.resolve(CriarArmaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(CreateArmaSchema, req.body);
      const arma = await criarArmaUseCase.execute(id, dto);
      res.status(201).json(arma);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarArmaUseCase = container.resolve(BuscarArmaUseCase);
      const { id } = req.params;
      const arma = await buscarArmaUseCase.execute(id);
      res.status(200).json(arma);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizaArmaUseCase = container.resolve(AtualizaArmaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(CreateArmaSchema, req.body);
      const arma = await atualizaArmaUseCase.execute(id, dto);
      res.status(200).json(arma);
    } catch (error) {
      next(error);
    }
  }
}
