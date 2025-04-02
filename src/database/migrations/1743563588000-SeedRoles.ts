import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class SeedRoles1743563588000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE roles
      ADD CONSTRAINT unique_role UNIQUE (role);
    `);

    await queryRunner.query(`
      INSERT INTO roles (id, role) VALUES 
      ('${uuidv4()}', 'ROOT'),
      ('${uuidv4()}', 'ADMIN'),
      ('${uuidv4()}', 'USUARIO')
      ON CONFLICT (role) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE roles
      DROP CONSTRAINT unique_role;
    `);

    await queryRunner.query(`
      DELETE FROM roles WHERE role IN ('ROOT', 'ADMIN', 'USUARIO');
    `);
  }
}
