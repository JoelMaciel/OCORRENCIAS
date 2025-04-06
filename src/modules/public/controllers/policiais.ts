import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarPolicialUseCase } from "../usecases/policial/criar-policial";
import { ListarPolicialUseCase } from "../usecases/policial/listar-policial";
import { BuscarPolicialUseCase } from "../usecases/policial/buscar-policial";
import { DeletarPolicialUseCase } from "../usecases/policial/deletar-policial";
import { AtualizarPoliciaBatalhaoUseCase } from "../usecases/policial/atualizar-batalha";
import { AtualizarPostoGraduacaolUseCase } from "../usecases/policial/atualizar-posto-graduacao";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreatePolicialSchema } from "../dtos/schemas/CreatePolicialSchema";
import { UpdatePoliciaBatalhaoSchema } from "../dtos/schemas/UpdatePoliciaBatalhaoSchema";
import { UpdatePostoGraduacaoSchema } from "../dtos/schemas/AtualizarPostoGraduacaoSchema";

export class PoliciasController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criaPolicialUseCase = container.resolve(CriarPolicialUseCase);
      const { id: batalhaoId } = req.params;
      const dto = await ValidationSchema.validate(CreatePolicialSchema, req.body);
      const policialData = {
        ...dto,
        dataAdmissao: new Date(dto.dataAdmissao),
      };

      const policial = await criaPolicialUseCase.execute(batalhaoId, policialData);

      res.status(201).json(policial);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const listarPolicialUseCase = container.resolve(ListarPolicialUseCase);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const matricula = req.query.matricula as string | undefined;

    const policiais = await listarPolicialUseCase.execute(page, limit, matricula);
    res.status(200).json(policiais);
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarPolicilaUseCase = container.resolve(BuscarPolicialUseCase);
      const { id } = req.params;
      const policial = await buscarPolicilaUseCase.execute(id);
      res.status(200).json(policial);
    } catch (error) {
      next(error);
    }
  }

  async updateBatalhao(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizarPoliciaBatalhaoUseCase = container.resolve(AtualizarPoliciaBatalhaoUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdatePoliciaBatalhaoSchema, req.body);

      const policial = await atualizarPoliciaBatalhaoUseCase.execute(id, dto);
      res.status(200).json(policial);
    } catch (error) {
      next(error);
    }
  }

  async updatePostoGraduacao(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizarPostoGraduacaolUseCase = container.resolve(AtualizarPostoGraduacaolUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdatePostoGraduacaoSchema, req.body);

      const policial = await atualizarPostoGraduacaolUseCase.execute(id, dto);
      res.status(200).json(policial);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletarPolicialUseCase = container.resolve(DeletarPolicialUseCase);
      const { id } = req.params;

      await deletarPolicialUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
