import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarOcorrenciaUseCase } from "../usecases/ocorrencia/criar-ocorrencia";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateOcorrenciaSchema } from "../dtos/schemas/CreateOcorrenciaSchema";
import { BuscarOcorrenciaUseCase } from "../usecases/ocorrencia/buscar-ocorrencia";
import { AtualizarOcorrenciaUseCase } from "../usecases/ocorrencia/atualizar-ocorrencia";
import { UpdateOcorrenciaSchema } from "../dtos/schemas/UpdateOcorrenciaSchema";

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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizarOcorrenciaUseCase = container.resolve(AtualizarOcorrenciaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdateOcorrenciaSchema, req.body);

      const updatedOcorrencia = await atualizarOcorrenciaUseCase.execute(id, dto);
      res.status(200).json(updatedOcorrencia);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarOcorrenciaUseCase = container.resolve(BuscarOcorrenciaUseCase);
      const { id } = req.params;
      const ocorrencia = await buscarOcorrenciaUseCase.execute(id);
      res.status(200).json(ocorrencia);
    } catch (error) {
      next(error);
    }
  }
}
