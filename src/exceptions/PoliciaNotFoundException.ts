import AppError from "../errors/AppError";

export default class PoliciaNotFoundException extends AppError {
  constructor() {
    super("Policial não encontrado.", 404);
  }
}
