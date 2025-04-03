import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdToOcorrenciasPoliciaisTable1743652130016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ocorrencias_policiais" ADD COLUMN "id" uuid`);

    await queryRunner.query(
      `ALTER TABLE "ocorrencias_policiais" ADD CONSTRAINT "PK_ocorrencias_policiais_id" PRIMARY KEY ("id")`
    );

    await queryRunner.query(
      `ALTER TABLE "ocorrencias_policiais" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ocorrencias_policiais" DROP CONSTRAINT "PK_ocorrencias_policiais_id"`
    );

    await queryRunner.query(`ALTER TABLE "ocorrencias_policiais" DROP COLUMN "id"`);
  }
}
