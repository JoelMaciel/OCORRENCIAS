import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { ICreateBatalhaoDTO } from "../dtos/ICreateBatalhaoDTO";
import { CriarBatalhaoUseCase } from "../usecases/batalhao/criar-batalhao";
import { ValidateDTO } from "../dtos/validation/ValidateDTO";
import { BuscarBatalhaoUseCase } from "../usecases/batalhao/buscar-batalhao";
import { DeletarBatalhaoUseCase } from "../usecases/batalhao/deletar-batalhao";
import { ListarBatalhaoUseCase } from "../usecases/batalhao/listar-batalhao";
import { AtualizarBatalhaoUseCase } from "../usecases/batalhao/atualizar-batalhao";
import { IUpdateBatalhaoDTO } from "../dtos/IUpdateBatalhaoDTO";

export class BatalhoesController {
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
    const batalhoes = await listarBatalhaoUseCase.execute();
    res.status(200).json(batalhoes);
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizaBatalhaoUseCase = container.resolve(AtualizarBatalhaoUseCase);
      const { id } = req.params;
      const dto = plainToInstance(IUpdateBatalhaoDTO, req.body);
      await ValidateDTO.validate(dto);

      const updatedBatalhao = await atualizaBatalhaoUseCase.execute(id, dto);
      res.status(200).json(updatedBatalhao);
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
