import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CriarViaturaUseCase } from "../usecases/viatura/criar-viatura";
import { ListarViaturasUseCase } from "../usecases/viatura/listar-viaturas";
import { AtualizarViaturaUseCase } from "../usecases/viatura/atualizar-viatura";
import { BuscarViaturaUseCase } from "../usecases/viatura/buscar-viatura";
import { DeletarViaturaUseCase } from "../usecases/viatura/deletar-viatura";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateViaturaSchema } from "../dtos/schemas/CreateViaturaSchema";
import { AtualizarViaturaSchema } from "../dtos/schemas/AtualizarViaturaSchema";

export class ViaturasController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarViaturaUseCase = container.resolve(CriarViaturaUseCase);

      const dto = await ValidationSchema.validate(CreateViaturaSchema, req.body);

      const newViatura = await criarViaturaUseCase.execute(dto);
      res.status(201).json(newViatura);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, resp: Response, next: NextFunction): Promise<void> {
    const listarViaturasUse = container.resolve(ListarViaturasUseCase);
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const prefixo = req.query.prefixo as string | undefined;

    const viaturas = await listarViaturasUse.execute(page, limit, prefixo);
    resp.status(200).json(viaturas);
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizaViaturaUseCase = container.resolve(AtualizarViaturaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(AtualizarViaturaSchema, req.body);

      const updatedViatura = await atualizaViaturaUseCase.execute(id, dto);
      res.status(200).json(updatedViatura);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarViaturaUseCase = container.resolve(BuscarViaturaUseCase);
      const { id } = req.params;

      const viatura = await buscarViaturaUseCase.execute(id);

      res.status(200).json(viatura);
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
}
