import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarPolicialUseCase } from "../usecases/policial/criar-policial";
import { ICreatePolicialDTO } from "../dtos/request/ICreatePolicialDTO";
import { ValidateDTO } from "../dtos/validation/ValidateDTO";
import { ListarPolicialUseCase } from "../usecases/policial/listar-policial";
import { BuscarPolicialUseCase } from "../usecases/policial/buscar-policial";
import { plainToInstance } from "class-transformer";
import { DeletarPolicialUseCase } from "../usecases/policial/deletar-policial";
import { AtualizarPoliciaBatalhaoUseCase } from "../usecases/policial/atualizar-batalha";
import { AtualizarPostoGraduacaolUseCase } from "../usecases/policial/atualizar-posto-graduacao";
import { IAtualizarBatalhaoDTO } from "../dtos/request/IAtualizarBatalhaoDTO";
import { IAtualizarPostoGraduacaoDTO } from "../dtos/request/IAtualizarPostoGraduacaoDTO";

export class PoliciasController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criaPolicialUseCase = container.resolve(CriarPolicialUseCase);
      const { id: batalhaoId } = req.params;
      const dto = plainToInstance(ICreatePolicialDTO, req.body);

      await ValidateDTO.validate(dto);
      const policial = await criaPolicialUseCase.execute(batalhaoId, dto);

      res.status(201).json(policial);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const listarPolicialUseCase = container.resolve(ListarPolicialUseCase);
    const policiais = await listarPolicialUseCase.execute();
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
      const dto = plainToInstance(IAtualizarBatalhaoDTO, req.body);
      await ValidateDTO.validate(dto);

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
      const dto = plainToInstance(IAtualizarPostoGraduacaoDTO, req.body);
      await ValidateDTO.validate(dto);

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
