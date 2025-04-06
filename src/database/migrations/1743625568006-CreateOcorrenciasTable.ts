import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOcorrenciasTable1743625568006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ocorrencias",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "m_ocorrencia",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "data_hora_inicial",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "data_hora_final",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "tipo_ocorrencia",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "artigo",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "resumo",
            type: "text",
            isNullable: false,
          },
          {
            name: "status",
            type: "enum",
            enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"],
            default: "'EM_ANDAMENTO'",
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
            name: "guarda_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "registrado_por_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "delegacia_destino",
            type: "varchar",
            length: "60",
            isNullable: false,
          },
          {
            name: "delegado_responsavel",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "numero_procedimento",
            type: "varchar",
            length: "50",
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
            columnNames: ["guarda_id"],
            referencedTableName: "corpo_guarda",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["registrado_por_id"],
            referencedTableName: "policiais",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
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
        name: "ocorrencias_policiais",
        columns: [
          {
            name: "ocorrencia_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "policial_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["ocorrencia_id"],
            referencedTableName: "ocorrencias",
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

    await queryRunner.query(`ALTER TABLE "acusados" ADD COLUMN "ocorrencia_id" uuid`);
    await queryRunner.createForeignKey(
      "acusados",
      new TableForeignKey({
        columnNames: ["ocorrencia_id"],
        referencedTableName: "ocorrencias",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.query(`ALTER TABLE "armas" ADD COLUMN "ocorrencia_id" uuid`);
    await queryRunner.createForeignKey(
      "armas",
      new TableForeignKey({
        columnNames: ["ocorrencia_id"],
        referencedTableName: "ocorrencias",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.query(`ALTER TABLE "drogas" ADD COLUMN "ocorrencia_id" uuid`);
    await queryRunner.createForeignKey(
      "drogas",
      new TableForeignKey({
        columnNames: ["ocorrencia_id"],
        referencedTableName: "ocorrencias",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "acusados" DROP COLUMN "ocorrencia_id"`);
    await queryRunner.query(`ALTER TABLE "armas" DROP COLUMN "ocorrencia_id"`);
    await queryRunner.query(`ALTER TABLE "drogas" DROP COLUMN "ocorrencia_id"`);
    await queryRunner.query(`ALTER TABLE "viaturas" DROP COLUMN "ocorrencia_id"`);
    await queryRunner.dropTable("ocorrencias_policiais");
    await queryRunner.dropTable("ocorrencias");
  }
}
