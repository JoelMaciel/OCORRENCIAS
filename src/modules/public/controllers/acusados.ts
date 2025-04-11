import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarAcusadoUseCase } from "../usecases/acusado/criar-acusado";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateAcusadoSchema } from "../dtos/schemas/CreateAcusadoSchema";
import { DeletarAcusadoUseCase } from "../usecases/acusado/deletar-acusado";
import { AtualizarAcusadoUseCase } from "../usecases/acusado/atualizar-acusado";
import { UpdateAcusadoSchema } from "../dtos/schemas/UpdateAcusadoSchema ";
import { BuscarAcusadoUseCase } from "../usecases/acusado/busca-acusado";
import { ListarAcusadoUseCase } from "../usecases/acusado/listar-acusado";

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

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listarAcusadoUseCase = container.resolve(ListarAcusadoUseCase);
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const nome = (req.query.nome as string) || undefined;
      const cpf = (req.query.cpf as string) || undefined;

      const result = await listarAcusadoUseCase.execute(page, limit, nome, cpf);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarAcusadoUseCase = container.resolve(BuscarAcusadoUseCase);
      const { id } = req.params;
      const acusado = await buscarAcusadoUseCase.execute(id);
      res.status(200).json(acusado);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizarAcusadoUseCase = container.resolve(AtualizarAcusadoUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdateAcusadoSchema, req.body);
      const acusado = await atualizarAcusadoUseCase.execute(id, dto);
      res.status(200).json(acusado);
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
