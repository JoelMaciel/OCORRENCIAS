import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUsuarioIdToPoliciais1742836486878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "policiais",
      new TableColumn({
        name: "usuario_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "policiais",
      new TableForeignKey({
        name: "FK_Policiais_Usuario",
        columnNames: ["usuario_id"],
        referencedTableName: "usuarios",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
