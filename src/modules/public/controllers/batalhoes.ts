import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { ICreateBatalhaoDTO } from "../dtos/ICreateBatalhaoDTO";
import { CriarBatalhaoUseCase } from "../usecases/batalhao/criar-batalhao";
import { ValidateDTO } from "../dtos/validation/ValidateDTO";
import { BuscarBatalhaoUseCase } from "../usecases/batalhao/buscar-batalhao";
import { DeletarBatalhaoUseCase } from "../usecases/batalhao/deletar-batalhao";

export class BatalhoesController {
  constructor() {
    this.create = this.create.bind(this);
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarBatalhaoUseCase = container.resolve(CriarBatalhaoUseCase);

      const dto = plainToInstance(ICreateBatalhaoDTO, req.body);

      await ValidateDTO.validate(dto);

      const newBatalhao = await criarBatalhaoUseCase.execute(dto);
      res.status(201).json(newBatalhao);
    } catch (error) {
      next(error);
    }
  }
  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarBatalhaoUseCase = container.resolve(BuscarBatalhaoUseCase);
      const { id } = req.params;

      const batalhao = await buscarBatalhaoUseCase.execute(id);
      res.status(200).json(batalhao);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletarBatalhaoUseCase = container.resolve(DeletarBatalhaoUseCase);
      const { id } = req.params;

      await deletarBatalhaoUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
