import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBatalhaoPoliciaCorpoGuarda1743543567858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "enderecos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "rua",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "numero",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "complemento",
            type: "varchar",
            length: "150",
            isNullable: true,
          },
          {
            name: "bairro",
            type: "varchar",
            length: "80",
            isNullable: false,
          },
          {
            name: "cidade",
            type: "varchar",
            length: "80",
            isNullable: false,
          },
          {
            name: "uf",
            type: "varchar",
            length: "3",
            isNullable: false,
          },
          {
            name: "cep",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "batalhoes",
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
            name: "data_criacao",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "data_atualizacao",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "endereco_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "batalhoes",
      new TableForeignKey({
        columnNames: ["endereco_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "enderecos",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "role",
            type: "enum",
            enum: ["ROOT", "ADMIN", "USUARIO"], // Valores do enum RoleType
            default: "'USUARIO'",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "policiais",
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
            name: "matricula",
            type: "varchar",
            length: "30",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "15",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "50",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "contato",
            type: "varchar",
            length: "15",
            isNullable: false,
          },
          {
            name: "posto_graduacao",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "ativo",
            type: "boolean",
            default: true,
          },
          {
            name: "data_admissao",
            type: "date",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "batalhao_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.query(`
      ALTER TABLE "policiais"
      ADD CONSTRAINT "chk_password_length" CHECK (LENGTH(password) >= 8 AND LENGTH(password) <= 30);
    `);

    await queryRunner.createForeignKey(
      "policiais",
      new TableForeignKey({
        columnNames: ["batalhao_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "batalhoes",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "policia_roles",
        columns: [
          {
            name: "policia_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "role_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["policia_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "policiais",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "corpo_guarda" DROP CONSTRAINT "FK_corpo_guarda_comandante"`
    );
    await queryRunner.query(
      `ALTER TABLE "corpo_guarda" DROP CONSTRAINT "FK_corpo_guarda_batalhao"`
    );
    await queryRunner.query(`ALTER TABLE "policiais" DROP CONSTRAINT "FK_policiais_usuario"`);
    await queryRunner.query(`ALTER TABLE "policiais" DROP CONSTRAINT "FK_policiais_batalhao"`);
    await queryRunner.query(`ALTER TABLE "batalhoes" DROP CONSTRAINT "FK_batalhoes_endereco"`);

    await queryRunner.query(`DROP TABLE "corpo_guarda_policiais"`);
    await queryRunner.query(`DROP TABLE "corpo_guarda"`);
    await queryRunner.query(`DROP TABLE "policiais"`);
    await queryRunner.query(`DROP TABLE "enderecos"`);
    await queryRunner.query(`DROP TABLE "batalhoes"`);
  }
}
