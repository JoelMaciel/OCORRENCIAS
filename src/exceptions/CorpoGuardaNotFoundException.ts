import AppError from "../errors/AppError";

export default class CorpoGuardaNotFoundException extends AppError {
  constructor() {
    super("Corpo da Guarda não encontrado.", 404);
  }
}
