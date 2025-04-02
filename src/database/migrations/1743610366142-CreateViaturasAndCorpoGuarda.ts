import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateViaturasAndCorpoGuarda1743610366142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "viaturas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "prefixo",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "placa",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "modelo",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "batalhao_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "status",
            type: "enum",
            enum: ["ATIVA", "INATIVA", "EM_SERVIÇO", "MANUTENÇÃO"],
            default: "'ATIVA'",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["batalhao_id"],
            referencedTableName: "batalhoes",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "corpo_guarda",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "data_criacao",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "data_atualizacao",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "batalhao_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "comandante_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["batalhao_id"],
            referencedTableName: "batalhoes",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["comandante_id"],
            referencedTableName: "policiais",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "corpo_guarda_policiais",
        columns: [
          {
            name: "corpo_guarda_id",
            type: "uuid",
          },
          {
            name: "policial_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["corpo_guarda_id"],
            referencedTableName: "corpo_guarda",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["policial_id"],
            referencedTableName: "policiais",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("corpo_guarda_policiais");
    await queryRunner.dropTable("corpo_guarda");
    await queryRunner.dropTable("viaturas");
  }
}
