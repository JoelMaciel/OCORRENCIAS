import AppError from "../errors/AppError";

export default class PrefixoAlreadyExistsException extends AppError {
  constructor() {
    super("Já existe uma viatura cadastrada com este prefixo", 409);
  }
}
