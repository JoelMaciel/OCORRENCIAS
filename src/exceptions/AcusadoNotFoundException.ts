import AppError from "../errors/AppError";

export default class AcusadoNotFoundException extends AppError {
  constructor() {
    super("Acusado não encontrado.", 404);
  }
}
