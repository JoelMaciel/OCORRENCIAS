import { validate } from "class-validator";
import AppError from "../../../../errors/AppError";

export class ValidateDTO {
  public static async validate(dto: object): Promise<void> {
    const errors = await validate(dto, { whitelist: true });

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) => {
        return error.children?.length
          ? error.children.map(
              (childError) =>
                `${childError.property}: ${Object.values(childError.constraints || {}).join(", ")}`
            )
          : `${error.property}: ${Object.values(error.constraints || {}).join(", ")}`;
      });

      throw new AppError(errorMessages.join("; "), 400);
    }
  }
}
