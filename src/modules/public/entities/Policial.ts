import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { CorpoGuarda } from "./CorpoGuarda";
import { Usuario } from "./Usuario";
import { Batalhao } from "./Batalhao";

@Entity("policiais")
export class Policial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 30, unique: true })
  matricula: string;

  @Column({ name: "posto_graduacao", length: 30 })
  postoGraduacao: string;

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

  @ManyToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.policiaisEnvolvidos)
  ocorrenciasEnvolvidas: Ocorrencia[];

  @OneToOne(() => Usuario, (usuario) => usuario.policial, { nullable: true })
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;
}
