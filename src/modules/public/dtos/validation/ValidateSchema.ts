import { z } from "zod";

export class ValidationSchema {
  public static validate<T>(schema: z.Schema<T>, data: unknown): Promise<T> {
    return schema.parseAsync(data);
  }
}
