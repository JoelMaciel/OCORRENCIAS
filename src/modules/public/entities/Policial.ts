import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ length: 30 })
  matricula: string;

  @Column({ name: "posto_graduacao", length: 30 })
  postoGraduacao: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Batalhao, (batalhao) => batalhao.policiais)
  batalhao: Batalhao;

  @ManyToMany(() => CorpoGuarda, (guarda) => guarda.policiais)
  guardas: CorpoGuarda[];

  @OneToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.registradoPor)
  ocorrenciasRegistradas: Ocorrencia[];

  @OneToMany(() => CorpoGuarda, (guarda) => guarda.comandante)
  comandanteDeGuarda: CorpoGuarda[];

  @ManyToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.policiaisEnvolvidos)
  ocorrenciasEnvolvidas: Ocorrencia[];

  @OneToOne(() => Usuario, (usuario) => usuario.policial)
  usuario: Usuario;
}
