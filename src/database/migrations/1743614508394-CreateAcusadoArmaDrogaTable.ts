import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAcusadoArmaDrogaTable1743614508394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "acusados",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "14",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "data_nascimento",
            type: "varchar",
            length: "10",
            isNullable: false,
          },
          {
            name: "nome_mae",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "nome_pai",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "naturalidade",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "nacionalidade",
            type: "varchar",
            length: "50",
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
          {
            name: "endereco_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["endereco_id"],
            referencedTableName: "enderecos",
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
        name: "drogas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "tipo",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "quantidade",
            type: "varchar",
            length: "25",
            isNullable: false,
          },
          {
            name: "unidade_medida",
            type: "enum",
            enum: ["mg", "g", "kg", "t"],
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
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "armas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "tipo",
            type: "varchar",
            length: "80",
            isNullable: false,
          },
          {
            name: "calibre",
            type: "varchar",
            length: "25",
            isNullable: false,
          },
          {
            name: "numeracao",
            type: "varchar",
            length: "80",
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("acusados");
    await queryRunner.dropTable("drogas");
    await queryRunner.dropTable("armas");
  }
}
