import AppError from "../errors/AppError";

export default class EmailAlreadyExistsException extends AppError {
  constructor() {
    super("Já existe um policial cadastrado com esse E-mail", 409);
  }
}
