import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Policial } from "./Policial";
import { Ocorrencia } from "./Ocorrencia";
import { Batalhao } from "./Batalhao";

@Entity("corpo_guarda")
export class CorpoGuarda {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "data_criacao" })
  dataCriacao: Date;

  @UpdateDateColumn({ name: "data_atualizacao" })
  dataAtualizacao: Date;

  @ManyToOne(() => Batalhao, (batalhao) => batalhao.corposGuarda)
  batalhao: Batalhao;

  @ManyToOne(() => Policial, (policial) => policial.comandanteDeGuarda)
  comandante: Policial;

  @ManyToMany(() => Policial, (policial) => policial.guardas)
  policiais: Policial[];

  @OneToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.guardaQuartel)
  ocorrencias: Ocorrencia[];
}
