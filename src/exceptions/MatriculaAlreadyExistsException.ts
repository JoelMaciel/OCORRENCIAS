import AppError from "../errors/AppError";

export default class MatriculaAlreadyExistsException extends AppError {
  constructor() {
    super("Já existe um Matricula com este número.", 409);
  }
}
