import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToMOcorrencia1743654312634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ocorrencias"
      ADD CONSTRAINT "UQ_m_ocorrencia" UNIQUE ("m_ocorrencia")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ocorrencias"
      DROP CONSTRAINT "UQ_m_ocorrencia"
    `);
  }
}
