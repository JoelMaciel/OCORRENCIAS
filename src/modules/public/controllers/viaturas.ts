import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CriarViaturaUseCase } from "../usecases/viatura/criar-viatura";
import { ICreateViaturaDTO } from "../dtos/request/ICreateViaturaDTO";
import { ListarViaturasUseCase } from "../usecases/viatura/listar-viaturas";
import { AtualizarViaturaUseCase } from "../usecases/viatura/atualizar-viatura";
import { IUpdateViaturaDTO } from "../dtos/request/IUpdateViaturaDTO";
import { BuscarViaturaUseCase } from "../usecases/viatura/buscar-viatura";
import { DeletarViaturaUseCase } from "../usecases/viatura/deletar-viatura";

export class ViaturasController {
  // async create(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const criarViaturaUseCase = container.resolve(CriarViaturaUseCase);

  //     const dto = plainToInstance(ICreateViaturaDTO, req.body);

  //     await ValidateDTO.validate(dto);

  //     const newViatura = await criarViaturaUseCase.execute(dto);
  //     res.status(201).json(newViatura);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async findAll(req: Request, resp: Response, next: NextFunction): Promise<void> {
    const listarViaturasUse = container.resolve(ListarViaturasUseCase);
    const viaturas = await listarViaturasUse.execute();
    resp.status(200).json(viaturas);
  }

  // async update(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const atualizaViaturaUseCase = container.resolve(AtualizarViaturaUseCase);
  //     const { id } = req.params;
  //     const dto = plainToInstance(IUpdateViaturaDTO, req.body);
  //     await ValidateDTO.validate(dto);

  //     const updatedViatura = await atualizaViaturaUseCase.execute(id, dto);
  //     res.status(200).json(updatedViatura);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

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
