import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarViaturaUseCase } from "../usecases/criar-viatura";
import { DeletarViaturaUseCase } from "../usecases/deletar-viatura";

export class ViaturasController {
  async create(req: Request, res: Response): Promise<Response> {
    const criarViaturaUseCase = container.resolve(CriarViaturaUseCase);
    const { prefixo, placa, modelo, unidadePoliciamento, status } = req.body;
    const newViatura = await criarViaturaUseCase.execute({
      prefixo,
      placa,
      modelo,
      unidadePoliciamento,
      status,
    });
    return res.status(201).json(newViatura);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deletarViaturaUseCase = container.resolve(DeletarViaturaUseCase);
    const { id } = req.params;
    await deletarViaturaUseCase.execute(id);
    return res.status(204).send();
  }
}
