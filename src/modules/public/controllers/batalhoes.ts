import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarBatalhaoUseCase } from "../usecases/batalhao/criar-batalhao";
import { BuscarBatalhaoUseCase } from "../usecases/batalhao/buscar-batalhao";
import { DeletarBatalhaoUseCase } from "../usecases/batalhao/deletar-batalhao";
import { ListarBatalhaoUseCase } from "../usecases/batalhao/listar-batalhao";
import { AtualizarBatalhaoUseCase } from "../usecases/batalhao/atualizar-batalhao";
import { CreateBatalhaoSchema } from "../dtos/schemas/CreateBatalhaoSchema";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { UpdateBatalhaoSchema } from "../dtos/schemas/UpdateBatalhaoSchema";

export class BatalhoesController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarBatalhaoUseCase = container.resolve(CriarBatalhaoUseCase);

      const dto = await ValidationSchema.validate(CreateBatalhaoSchema, req.body);

      const newBatalhao = await criarBatalhaoUseCase.execute(dto);
      res.status(201).json(newBatalhao);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizaBatalhaoUseCase = container.resolve(AtualizarBatalhaoUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdateBatalhaoSchema, req.body);

      const updatedBatalhao = await atualizaBatalhaoUseCase.execute(id, dto);
      res.status(200).json(updatedBatalhao);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarBatalhaoUseCase = container.resolve(BuscarBatalhaoUseCase);
      const { id } = req.params;

      const batalhao = await buscarBatalhaoUseCase.execute(id);
      res.status(200).json(batalhao);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const listarBatalhaoUseCase = container.resolve(ListarBatalhaoUseCase);
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const nome = req.query.nome as string | undefined;

    const result = await listarBatalhaoUseCase.execute(page, limit, nome);
    res.status(200).json(result);
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
