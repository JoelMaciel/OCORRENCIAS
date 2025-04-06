import AppError from "../errors/AppError";

export default class ViaturaNotFoundException extends AppError {
  constructor() {
    super("Viatura não encontrada.", 404);
  }
}
