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
import { Policial } from "./Policial";
import { Viatura } from "./Viatura";
import { Arma } from "./Arma";
import { VeiculoApreendido } from "./VeiculoApreendido";
import { Droga } from "./Droga";
import { StatusOcorrencia } from "../enums/StatusOcorrencia";
import { CorpoGuarda } from "./CorpoGuarda";
import { Acusado } from "./Acusado";
import { Vitima } from "./Vitima";
import { ObjetoApreendido } from "./ObjetoApreendido";

@Entity("ocorrencias")
export class Ocorrencia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "m_ocorrencia", length: 30 })
  mOcorrencia: string;

  @Column({ name: "data_hora_inicial" })
  dataHoraInicial: Date;

  @Column({ name: "data_hora_final" })
  dataHoraFinal: Date;

  @Column({ length: 100 })
  tipoOcorrencia: string;

  @Column({ length: 50 })
  artigo: string;

  @Column({ type: "text" })
  resumo: string;

  @Column({
    type: "enum",
    enum: StatusOcorrencia,
    default: StatusOcorrencia.PENDENTE,
  })
  status: StatusOcorrencia;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CorpoGuarda, (guarda) => guarda.ocorrencias)
  guardaQuartel: CorpoGuarda;

  @ManyToOne(() => Policial, (policial) => policial.ocorrenciasRegistradas)
  registradoPor: Policial;

  @ManyToMany(() => Policial, (policial) => policial.ocorrenciasEnvolvidas)
  policiaisEnvolvidos: Policial[];

  @OneToOne(() => Viatura)
  viatura: Viatura;

  @OneToMany(() => Arma, (arma) => arma.ocorrencia)
  armas: Arma[];

  @OneToMany(() => Droga, (droga) => droga.ocorrencia)
  drogas: Droga[];

  @OneToMany(() => ObjetoApreendido, (objeto) => objeto.ocorrencia)
  objetosApreendidos: ObjetoApreendido[];

  @OneToMany(() => Acusado, (acusado) => acusado.ocorrencia)
  acusados: Acusado[];

  @OneToMany(() => Vitima, (vitima) => vitima.ocorrencia)
  vitimas: Vitima[];

  @OneToMany(() => VeiculoApreendido, (veiculo) => veiculo.ocorrencia)
  veiculos: VeiculoApreendido[];

  @Column({ name: "delegacia_destino", length: 30 })
  delegaciaDestino: string;

  @Column({ name: "delegado_responsavel", length: 100 })
  delegadoResponsavel: string;

  @Column({ name: "numero_procedimento", length: 50 })
  numeroProcedimento: string;
}
