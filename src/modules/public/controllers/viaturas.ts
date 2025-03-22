import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CriarViaturaUseCase } from "../usecases/criar-viatura";
import { DeletarViaturaUseCase } from "../usecases/deletar-viatura";
import { BuscarViaturaUseCase } from "../usecases/buscar-viatura";
import { plainToInstance } from "class-transformer";
import { ICreateViaturaDTO } from "../dtos/ICreateViaturaDTO";
import { ValidationService } from "../usecases/validation/ValidationService";

export class ViaturasController {
  constructor() {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.buscarViatura = this.buscarViatura.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarViaturaUseCase = container.resolve(CriarViaturaUseCase);

      const dto = plainToInstance(ICreateViaturaDTO, req.body);

      await ValidationService.validate(dto);

      const newViatura = await criarViaturaUseCase.execute(dto);
      res.status(201).json(newViatura);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletarViaturaUseCase = container.resolve(DeletarViaturaUseCase);
      const { id } = req.params;

      await deletarViaturaUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async buscarViatura(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarViaturaUseCase = container.resolve(BuscarViaturaUseCase);
      const { id } = req.params;

      const viatura = await buscarViaturaUseCase.execute(id);
      res.status(200).json(viatura);
    } catch (error) {
      next(error);
    }
  }
}
