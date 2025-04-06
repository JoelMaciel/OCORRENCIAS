import AppError from "../errors/AppError";

export default class BatalhaoNotFoundException extends AppError {
  constructor() {
    super("Batalhão não encontrado.", 404);
  }
}
