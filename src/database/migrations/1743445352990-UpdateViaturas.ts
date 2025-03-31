import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateViaturas1743445352990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE viaturas ADD COLUMN batalhao_id UUID`);

    await queryRunner.query(`
                ALTER TABLE viaturas
                ADD CONSTRAINT fk_batalhao
                FOREIGN KEY (batalhao_id) REFERENCES batalhoes(id)
                ON DELETE SET NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE viaturas ADD COLUMN unidadePoliciamento VARCHAR(30);
    `);

    await queryRunner.query(`
      ALTER TABLE viaturas DROP CONSTRAINT fk_batalhao;
    `);

    await queryRunner.query(`
      ALTER TABLE viaturas DROP COLUMN batalhao_id;
    `);
  }
}
