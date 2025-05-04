import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFiscalAndSupervisorToOcorrencia1746367399633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE ocorrencias
      ADD COLUMN fiscal_id uuid,
      ADD COLUMN supervisor_id uuid
    `);

    await queryRunner.createForeignKey(
      "ocorrencias",
      new TableForeignKey({
        name: "FK_OCORRENCIA_FISCAL",
        columnNames: ["fiscal_id"],
        referencedTableName: "policiais",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "ocorrencias",
      new TableForeignKey({
        name: "FK_OCORRENCIA_SUPERVISOR",
        columnNames: ["supervisor_id"],
        referencedTableName: "policiais",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("ocorrencias", "FK_OCORRENCIA_FISCAL");
    await queryRunner.dropForeignKey("ocorrencias", "FK_OCORRENCIA_SUPERVISOR");

    await queryRunner.query(`
      ALTER TABLE ocorrencias
      DROP COLUMN fiscal_id,
      DROP COLUMN supervisor_id
    `);
  }
}
