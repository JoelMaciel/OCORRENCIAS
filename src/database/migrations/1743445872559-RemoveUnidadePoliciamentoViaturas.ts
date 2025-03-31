import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUnidadePoliciamentoViaturas1743445872559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE viaturas DROP COLUMN unidade_policiamento;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE viaturas ADD COLUMN unidade_policiamento VARCHAR(30);
    `);
  }
}
