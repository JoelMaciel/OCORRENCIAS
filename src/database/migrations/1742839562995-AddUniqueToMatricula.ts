import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueToMatricula1742839562995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE policiais
      ADD CONSTRAINT UQ_matricula UNIQUE (matricula);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE policiais
      DROP CONSTRAINT UQ_matricula;
    `);
  }
}
