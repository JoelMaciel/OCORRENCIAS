import AppError from "../errors/AppError";

export default class ArmaNotFoundException extends AppError {
  constructor() {
    super("Arma não encontrada.", 404);
  }
}
