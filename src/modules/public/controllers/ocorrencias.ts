import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarOcorrenciaUseCase } from "../usecases/ocorrencia/criar-ocorrencia";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateOcorrenciaSchema } from "../dtos/schemas/CreateOcorrenciaSchema";

export class OcorrenciasController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarOcorrenciaUseCase = container.resolve(CriarOcorrenciaUseCase);
      const dto = await ValidationSchema.validate(CreateOcorrenciaSchema, req.body);
      const ocorrencia = await criarOcorrenciaUseCase.execute(dto);
      res.status(201).json(ocorrencia);
    } catch (error) {
      next(error);
    }
  }
}
