import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCorpoGuardaPoliciais1742999651101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "corpo_guarda_policiais",
        columns: [
          {
            name: "corpo_guarda_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "policial_id",
            type: "uuid",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["corpo_guarda_id"],
            referencedTableName: "corpo_guarda",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["policial_id"],
            referencedTableName: "policiais",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("corpo_guarda_policiais");
  }
}
