import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPasswordFieldInPoliciais1743553707222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "policiais"
      DROP CONSTRAINT IF EXISTS "chk_password_length";
    `);

    await queryRunner.query(`
      ALTER TABLE "policiais"
      ALTER COLUMN "password" TYPE VARCHAR(255);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "policiais"
      ALTER COLUMN "password" TYPE VARCHAR(30);
    `);

    await queryRunner.query(`
      ALTER TABLE "policiais"
      ADD CONSTRAINT "chk_password_length" CHECK (LENGTH(password) >= 8 AND LENGTH(password) <= 30);
    `);
  }
}
