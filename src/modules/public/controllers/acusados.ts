import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarAcusadoUseCase } from "../usecases/acusado/criar-acusado";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateAcusadoSchema } from "../dtos/schemas/CreateAcusadoSchema";
import { DeletarAcusadoUseCase } from "../usecases/acusado/deletar-acusado";

export class AcusadosController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarAcusadoUseCase = container.resolve(CriarAcusadoUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(CreateAcusadoSchema, req.body);

      const acusado = await criarAcusadoUseCase.execute(id, dto);

      res.status(201).json(acusado);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletarAcusadoUseCase = container.resolve(DeletarAcusadoUseCase);
      const { id } = req.params;
      await deletarAcusadoUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
