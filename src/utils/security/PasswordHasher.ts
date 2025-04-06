import * as bcrypt from "bcrypt";

export class PasswordHasher {
  private static readonly SALT_ROUNDS = 10;

  public static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  public static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
