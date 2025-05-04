import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddContatoBatalhoes1745919800375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "batalhoes",
      new TableColumn({
        name: "contato",
        type: "varchar",
        length: "20",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("batalhoes", "contato");
  }
}
