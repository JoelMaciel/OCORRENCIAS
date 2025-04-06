import AppError from "../errors/AppError";

export default class MOcorrenciaAlredyExistsException extends AppError {
  constructor(id: string) {
    super("Já existe um M-Ocorrência com este número.", 409);
  }
}
