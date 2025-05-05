import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CriarOcorrenciaUseCase } from "../usecases/ocorrencia/criar-ocorrencia";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateOcorrenciaSchema } from "../dtos/schemas/CreateOcorrenciaSchema";
import { BuscarOcorrenciaUseCase } from "../usecases/ocorrencia/buscar-ocorrencia";
import { AtualizarOcorrenciaUseCase } from "../usecases/ocorrencia/atualizar-ocorrencia";
import { UpdateOcorrenciaSchema } from "../dtos/schemas/UpdateOcorrenciaSchema";
import { ListarOcorrenciasUseCase } from "../usecases/ocorrencia/listar-ocorrencia";
import { StatusOcorrencia } from "../enums/StatusOcorrencia";
import { AtualizarStatusConcluidaUseCase } from "../usecases/ocorrencia/atualizar-status-concluida";
import { AtualizarStatusCanceladaUseCase } from "../usecases/ocorrencia/atualizar-status-cancelada";

export class OcorrenciasController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criarOcorrenciaUseCase = container.resolve(CriarOcorrenciaUseCase);
      const dto = await ValidationSchema.validate(CreateOcorrenciaSchema, req.body);
      const ocorrencia = await criarOcorrenciaUseCase.execute(dto);
      res.status(201).json(ocorrencia);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listarOcorrenciasUseCase = container.resolve(ListarOcorrenciasUseCase);
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const mOcorrencia = req.query.mOcorrencia as string | undefined;
      const cidade = req.query.cidade as string | undefined;
      const bairro = req.query.bairro as string | undefined;
      const prefixoViatura = req.query.prefixoViatura as string | undefined;
      const dataHoraInicial = req.query.dataHoraInicial as string | undefined;
      const dataHoraFinal = req.query.dataHoraInicial as string | undefined;
      const status = req.query.status as string | undefined;

      const result = await listarOcorrenciasUseCase.execute(
        page,
        limit,
        mOcorrencia,
        cidade,
        bairro,
        prefixoViatura,
        dataHoraInicial,
        dataHoraFinal,
        status
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizarOcorrenciaUseCase = container.resolve(AtualizarOcorrenciaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdateOcorrenciaSchema, req.body);

      const updatedOcorrencia = await atualizarOcorrenciaUseCase.execute(id, dto);
      res.status(200).json(updatedOcorrencia);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscarOcorrenciaUseCase = container.resolve(BuscarOcorrenciaUseCase);
      const { id } = req.params;
      const ocorrencia = await buscarOcorrenciaUseCase.execute(id);
      res.status(200).json(ocorrencia);
    } catch (error) {
      next(error);
    }
  }

  async statusConcluded(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const atualizarStatusConcluidaUseCase = container.resolve(AtualizarStatusConcluidaUseCase);
      await atualizarStatusConcluidaUseCase.execute(id, StatusOcorrencia.CONCLUIDA);
      res.status(200).json({ message: "Ocorrência concluída com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async statusCanceled(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const atualizarStatusCanceladaUseCase = container.resolve(AtualizarStatusCanceladaUseCase);
      await atualizarStatusCanceladaUseCase.execute(id, StatusOcorrencia.CANCELADA);
      res.status(200).json({ message: "Ocorrência cancelada com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
