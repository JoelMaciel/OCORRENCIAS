import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { CorpoGuarda } from "./CorpoGuarda";
import { Batalhao } from "./Batalhao";
import { Role } from "./Role";
import { OcorrenciaPolicial } from "./OcorrenciaPolicial";

@Entity("policiais")
export class Policial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 30, unique: true })
  matricula: string;

  @Column({ length: 15, unique: true })
  cpf: string;

  @Column({ length: 15 })
  contato: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ name: "posto_graduacao", length: 30 })
  postoGraduacao: string;

  @Column({ type: "boolean", default: true })
  ativo: boolean;

  @Column({ name: "data_admissao" })
  dataAdmissao: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Batalhao, (batalhao) => batalhao.policiais)
  @JoinColumn({ name: "batalhao_id" })
  batalhao: Batalhao;

  @ManyToMany(() => CorpoGuarda, (guarda) => guarda.policiais)
  guardas: CorpoGuarda[];

  @OneToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.registradoPor)
  ocorrenciasRegistradas: Ocorrencia[];

  @OneToMany(() => CorpoGuarda, (guarda) => guarda.comandante)
  comandanteDeGuarda: CorpoGuarda[];

  @OneToMany(() => OcorrenciaPolicial, (ocorrenciaPolicial) => ocorrenciaPolicial.policial, {
    cascade: true,
  })
  ocorrenciasEnvolvidas: OcorrenciaPolicial[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: "policia_roles",
    joinColumn: { name: "policia_id" },
    inverseJoinColumn: { name: "role_id" },
  })
  roles: Role[];
}
