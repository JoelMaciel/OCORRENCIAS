import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarCorpoGuardaUseCase } from "../usecases/corpoGuarda/criar-corpo-guarda";
import { AtualizarCorpoGuardaUseCase } from "../usecases/corpoGuarda/atualizar-corpo-guarda";
import { BuscarCorpoGuardaUseCase } from "../usecases/corpoGuarda/buscar-corpo-guarda";
import { ListarCorpoGuardaUseCase } from "../usecases/corpoGuarda/listar-corpo-guarda";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateCorpoGuardaSchema } from "../dtos/schemas/CreateCorpoGuardaSchema";
import { UpdateCorpoGuardaSchema } from "../dtos/schemas/UpdateCorpoGuardaSchema";

export class CorpoGuardaController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarCorpoGuardaUseCase = container.resolve(CriarCorpoGuardaUseCase);
      const dto = await ValidationSchema.validate(CreateCorpoGuardaSchema, req.body);
      const corpoGuarda = await criarCorpoGuardaUseCase.execute(dto);
      res.status(201).json(corpoGuarda);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const dataInicial = req.query.dataInicial
        ? new Date(req.query.dataInicial as string)
        : undefined;

      const dataFinal = req.query.dataFinal ? new Date(req.query.dataFinal as string) : undefined;

      const listarCorpaGuardaUseCase = container.resolve(ListarCorpoGuardaUseCase);

      const result = await listarCorpaGuardaUseCase.execute(page, limit, dataInicial, dataFinal);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const buscarCorpoGuardaUseCase = container.resolve(BuscarCorpoGuardaUseCase);
    const { id } = req.params;
    try {
      const corpoGuarda = await buscarCorpoGuardaUseCase.execute(id);
      res.status(201).json(corpoGuarda);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizaCorpoGuardaUseCase = container.resolve(AtualizarCorpoGuardaUseCase);

      const { id } = req.params;

      const dto = await ValidationSchema.validate(UpdateCorpoGuardaSchema, req.body);

      const corpoGuarda = await atualizaCorpoGuardaUseCase.execute(id, dto);

      res.status(200).json(corpoGuarda);
    } catch (error) {
      next(error);
    }
  }
}
