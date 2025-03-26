import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddBatalhaoIdToPoliciais1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "policiais",
      new TableColumn({
        name: "batalhao_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "policiais",
      new TableForeignKey({
        name: "FK_Policiais_Batalhao",
        columnNames: ["batalhao_id"],
        referencedTableName: "batalhoes",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("policiais", "FK_Policiais_Batalhao");

    await queryRunner.dropColumn("policiais", "batalhao_id");
  }
}
