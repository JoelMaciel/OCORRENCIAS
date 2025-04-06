import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddOcorrenciaIdToViaturas1743724649253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "viaturas",
      new TableColumn({
        name: "ocorrencia_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "viaturas",
      new TableForeignKey({
        columnNames: ["ocorrencia_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "ocorrencias",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("viaturas");

    if (!table) {
      throw new Error("Tabela 'viaturas' não encontrada.");
    }

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("ocorrencia_id") !== -1
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey("viaturas", foreignKey);
    }

    await queryRunner.dropColumn("viaturas", "ocorrencia_id");
  }
}
