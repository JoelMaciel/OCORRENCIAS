import AppError from "../errors/AppError";

export default class CPFAlreadyExistsException extends AppError {
  constructor() {
    super("Já existe um policial cadastrado com esse CPF", 409);
  }
}
