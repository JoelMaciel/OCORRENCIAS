import { inject } from "tsyringe";
import { OcorrenciaRepository } from "../repositories/OcorrenciaRepository";

export class OcorrenciaService {
  constructor(
    @inject("OcorrenciaRepositoryImpl") private readonly ocorrenciaRepository: OcorrenciaRepository
  ) {}
}
