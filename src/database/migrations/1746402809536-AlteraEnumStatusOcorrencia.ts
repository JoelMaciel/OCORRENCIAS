import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraEnumStatusOcorrencia1746402809536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE ocorrencias_status_enum RENAME TO ocorrencias_status_enum_old;
    `);

    await queryRunner.query(`
      CREATE TYPE ocorrencias_status_enum AS ENUM ('EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');
    `);

    await queryRunner.query(`
      ALTER TABLE ocorrencias ALTER COLUMN status DROP DEFAULT;
    `);

    await queryRunner.query(`
      ALTER TABLE ocorrencias ALTER COLUMN status TYPE ocorrencias_status_enum USING status::text::ocorrencias_status_enum;
    `);

    await queryRunner.query(`
      ALTER TABLE ocorrencias ALTER COLUMN status SET DEFAULT 'EM_ANDAMENTO'::ocorrencias_status_enum;
    `);

    await queryRunner.query(`
      DROP TYPE ocorrencias_status_enum_old;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE ocorrencias_status_enum RENAME TO ocorrencias_status_enum_old;
    `);

    await queryRunner.query(`
      CREATE TYPE ocorrencias_status_enum AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA');
    `);

    await queryRunner.query(`
      ALTER TABLE ocorrencias ALTER COLUMN status DROP DEFAULT;
    `);

    await queryRunner.query(`
      ALTER TABLE ocorrencias ALTER COLUMN status TYPE ocorrencias_status_enum USING 
        CASE 
          WHEN status = 'CANCELADA' THEN 'EM_ANDAMENTO'::ocorrencias_status_enum 
          ELSE status::text::ocorrencias_status_enum 
        END;
    `);

    await queryRunner.query(`
      ALTER TABLE ocorrencias ALTER COLUMN status SET DEFAULT 'EM_ANDAMENTO'::ocorrencias_status_enum;
    `);

    await queryRunner.query(`
      DROP TYPE ocorrencias_status_enum_old;
    `);
  }
}
