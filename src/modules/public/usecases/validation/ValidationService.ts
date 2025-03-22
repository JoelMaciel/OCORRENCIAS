import { validate } from "class-validator";
import AppError from "../../../../errors/AppError";

export class ValidationService {
  public static async validate(dto: object): Promise<void> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints || {}).join(", "))
        .join("; ");
      throw new AppError(errorMessage, 400);
    }
  }
}
