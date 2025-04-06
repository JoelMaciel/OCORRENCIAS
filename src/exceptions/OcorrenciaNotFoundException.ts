import AppError from "../errors/AppError";

export default class OcorrenciaNotFoundException extends AppError {
  constructor() {
    super("Ocorrencia não encontrada.", 404);
  }
}
