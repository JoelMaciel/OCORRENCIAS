import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVariasTabelas1742669896800 implements MigrationInterface {
    name = 'CreateVariasTabelas1742669896800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rua" character varying(100) NOT NULL, "numero" character varying(20) NOT NULL, "complemento" character varying(150), "bairro" character varying(80) NOT NULL, "cidade" character varying(80) NOT NULL, "uf" character varying(3) NOT NULL, "cep" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "batalhoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "enderecoId" uuid, CONSTRAINT "REL_8b14126bda32bdef14ad411663" UNIQUE ("enderecoId"), CONSTRAINT "PK_adf77d420db15a0dad56d86c2f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "corpo_guarda" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "batalhaoId" uuid, "comandanteId" uuid, CONSTRAINT "PK_23ad834ba363a63253f99241c60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "senha" character varying(30) NOT NULL, "role" character varying NOT NULL, "policialId" uuid, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "REL_7041baa82fe3c63cf63c888a37" UNIQUE ("policialId"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "policiais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "matricula" character varying(30) NOT NULL, "posto_graduacao" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9eae817bd0a37d337ac70bd160" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."viaturas_status_enum" AS ENUM('ATIVA', 'INATIVA', 'EM_SERVIÇO', 'MANUTENÇÃO')`);
        await queryRunner.query(`CREATE TABLE "viaturas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "prefixo" character varying(20) NOT NULL, "placa" character varying(20) NOT NULL, "modelo" character varying(30) NOT NULL, "unidade_policiamento" character varying(30) NOT NULL, "status" "public"."viaturas_status_enum" NOT NULL, "ocorrenciaId" uuid, CONSTRAINT "REL_24c704ed7903c8014bd6e04ace" UNIQUE ("ocorrenciaId"), CONSTRAINT "PK_06a82d2210113068cb6e1043ab7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "armas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" character varying(80) NOT NULL, "calibre" character varying(25) NOT NULL, "numeracao" character varying(80) NOT NULL, "created-at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ocorrenciaId" uuid, CONSTRAINT "REL_ef687195c24cec975b96bb5553" UNIQUE ("ocorrenciaId"), CONSTRAINT "PK_a9faaa8ed583a9f156625f7a502" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veiculos_apreendidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "placa" character varying(20) NOT NULL, "modelo" character varying(30) NOT NULL, "cor" character varying(20) NOT NULL, "situacao" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ocorrenciaId" uuid, CONSTRAINT "REL_00dc7e0a182bc27dba9356e34f" UNIQUE ("ocorrenciaId"), CONSTRAINT "PK_9231293181d650b0a6094f49d0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."drogas_unidade_medida_enum" AS ENUM('mg', 'g', 'kg', 't')`);
        await queryRunner.query(`CREATE TABLE "drogas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" character varying(100) NOT NULL, "quantidade" character varying(25) NOT NULL, "unidade_medida" "public"."drogas_unidade_medida_enum" NOT NULL, "created-at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ocorrenciaId" uuid, CONSTRAINT "REL_027412e0dc3215332804667528" UNIQUE ("ocorrenciaId"), CONSTRAINT "PK_75dbb9bb0874f29b834a3c491c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "acusados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "cpf" character varying(14) NOT NULL, "data_nascimento" character varying(10) NOT NULL, "nome_mae" character varying(100) NOT NULL, "nome_pai" character varying(100) NOT NULL, "naturalidade" character varying(50) NOT NULL, "nacionalidade" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enderecoId" uuid, CONSTRAINT "REL_efe825a471947c4ec33daf95dc" UNIQUE ("enderecoId"), CONSTRAINT "PK_997cd1bf6de30d752e1eec52bd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "objeto_apreendido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" text NOT NULL, "tipo" character varying(80) NOT NULL, "calibre" character varying(20), "quantidade" character varying(20), "condicao" character varying(100), "numeroSerie" character varying(80), "marca" character varying(80), "modelo" character varying(80), "CRAF" character varying(50), "dono" character varying(100), "ocorrenciaId" uuid, CONSTRAINT "PK_7a651d5c6a5ea123ab18bcfbf15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ocorrencias_status_enum" AS ENUM('Pendente', 'Concluída', 'Em Andamento', 'Cancelada')`);
        await queryRunner.query(`CREATE TABLE "ocorrencias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "m_ocorrencia" character varying(30) NOT NULL, "data_hora_inicial" TIMESTAMP NOT NULL, "data_hora_final" TIMESTAMP NOT NULL, "tipoOcorrencia" character varying(100) NOT NULL, "artigo" character varying(50) NOT NULL, "resumo" text NOT NULL, "status" "public"."ocorrencias_status_enum" NOT NULL DEFAULT 'Pendente', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "delegacia_destino" character varying(30) NOT NULL, "delegado_responsavel" character varying(100) NOT NULL, "numero_procedimento" character varying(50) NOT NULL, "guardaQuartelId" uuid, "registradoPorId" uuid, CONSTRAINT "PK_a04319dc4023e6a220648bf6006" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "presos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "cpf" character varying(20) NOT NULL, "data_nascimento" character varying(20) NOT NULL, "nome_mae" character varying(100) NOT NULL, "nome_pai" character varying(100) NOT NULL, "naturalidade" character varying(30) NOT NULL, "nacionalidade" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enderecoId" uuid, CONSTRAINT "REL_492162c49eeae71eb483e9706e" UNIQUE ("enderecoId"), CONSTRAINT "PK_2a2b40cebd4fa1522102274fbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "batalhoes" ADD CONSTRAINT "FK_8b14126bda32bdef14ad4116636" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "corpo_guarda" ADD CONSTRAINT "FK_1b9fa9060644a31c6915f86f855" FOREIGN KEY ("batalhaoId") REFERENCES "batalhoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "corpo_guarda" ADD CONSTRAINT "FK_4c39147bb59f4cb49c3b0da01d1" FOREIGN KEY ("comandanteId") REFERENCES "policiais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_7041baa82fe3c63cf63c888a375" FOREIGN KEY ("policialId") REFERENCES "policiais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viaturas" ADD CONSTRAINT "FK_24c704ed7903c8014bd6e04ace1" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "armas" ADD CONSTRAINT "FK_ef687195c24cec975b96bb55532" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos_apreendidos" ADD CONSTRAINT "FK_00dc7e0a182bc27dba9356e34f5" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drogas" ADD CONSTRAINT "FK_027412e0dc32153328046675289" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "acusados" ADD CONSTRAINT "FK_efe825a471947c4ec33daf95dc4" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "objeto_apreendido" ADD CONSTRAINT "FK_562944260a254b1ec39edd07f6b" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ocorrencias" ADD CONSTRAINT "FK_98bc0f72ae19e948612faa39d6a" FOREIGN KEY ("guardaQuartelId") REFERENCES "corpo_guarda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ocorrencias" ADD CONSTRAINT "FK_8d470e4bde8a6b638b031c1caa3" FOREIGN KEY ("registradoPorId") REFERENCES "policiais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "presos" ADD CONSTRAINT "FK_492162c49eeae71eb483e9706e3" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presos" DROP CONSTRAINT "FK_492162c49eeae71eb483e9706e3"`);
        await queryRunner.query(`ALTER TABLE "ocorrencias" DROP CONSTRAINT "FK_8d470e4bde8a6b638b031c1caa3"`);
        await queryRunner.query(`ALTER TABLE "ocorrencias" DROP CONSTRAINT "FK_98bc0f72ae19e948612faa39d6a"`);
        await queryRunner.query(`ALTER TABLE "objeto_apreendido" DROP CONSTRAINT "FK_562944260a254b1ec39edd07f6b"`);
        await queryRunner.query(`ALTER TABLE "acusados" DROP CONSTRAINT "FK_efe825a471947c4ec33daf95dc4"`);
        await queryRunner.query(`ALTER TABLE "drogas" DROP CONSTRAINT "FK_027412e0dc32153328046675289"`);
        await queryRunner.query(`ALTER TABLE "veiculos_apreendidos" DROP CONSTRAINT "FK_00dc7e0a182bc27dba9356e34f5"`);
        await queryRunner.query(`ALTER TABLE "armas" DROP CONSTRAINT "FK_ef687195c24cec975b96bb55532"`);
        await queryRunner.query(`ALTER TABLE "viaturas" DROP CONSTRAINT "FK_24c704ed7903c8014bd6e04ace1"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_7041baa82fe3c63cf63c888a375"`);
        await queryRunner.query(`ALTER TABLE "corpo_guarda" DROP CONSTRAINT "FK_4c39147bb59f4cb49c3b0da01d1"`);
        await queryRunner.query(`ALTER TABLE "corpo_guarda" DROP CONSTRAINT "FK_1b9fa9060644a31c6915f86f855"`);
        await queryRunner.query(`ALTER TABLE "batalhoes" DROP CONSTRAINT "FK_8b14126bda32bdef14ad4116636"`);
        await queryRunner.query(`DROP TABLE "presos"`);
        await queryRunner.query(`DROP TABLE "ocorrencias"`);
        await queryRunner.query(`DROP TYPE "public"."ocorrencias_status_enum"`);
        await queryRunner.query(`DROP TABLE "objeto_apreendido"`);
        await queryRunner.query(`DROP TABLE "acusados"`);
        await queryRunner.query(`DROP TABLE "drogas"`);
        await queryRunner.query(`DROP TYPE "public"."drogas_unidade_medida_enum"`);
        await queryRunner.query(`DROP TABLE "veiculos_apreendidos"`);
        await queryRunner.query(`DROP TABLE "armas"`);
        await queryRunner.query(`DROP TABLE "viaturas"`);
        await queryRunner.query(`DROP TYPE "public"."viaturas_status_enum"`);
        await queryRunner.query(`DROP TABLE "policiais"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "corpo_guarda"`);
        await queryRunner.query(`DROP TABLE "batalhoes"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
