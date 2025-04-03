import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
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
import { CorpoGuarda } from "./CorpoGuarda";
import { Acusado } from "./Acusado";
import { Vitima } from "./Vitima";
import { ObjetoApreendido } from "./ObjetoApreendido";
import { StatusOcorrencia } from "../enums/StatusOcorrencia";
import { Endereco } from "./Endereco";
import { OcorrenciaPolicial } from "./OcorrenciaPolicial";

@Entity("ocorrencias")
export class Ocorrencia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "m_ocorrencia", unique: true, length: 30 })
  mOcorrencia: string;

  @Column({ name: "data_hora_inicial" })
  dataHoraInicial: string;

  @Column({ name: "data_hora_final" })
  dataHoraFinal: string;

  @Column({ name: "tipo_ocorrencia", length: 100 })
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

  @ManyToOne(() => CorpoGuarda, (guarda) => guarda.ocorrenciasRegistradas)
  @JoinColumn({ name: "guarda_id" })
  corpoGuarda: CorpoGuarda;

  @ManyToOne(() => Policial, (policial) => policial.ocorrenciasRegistradas)
  @JoinColumn({ name: "registrado_por_id" })
  registradoPor: Policial;

  @OneToMany(() => OcorrenciaPolicial, (ocorrenciaPolicial) => ocorrenciaPolicial.ocorrencia, {
    cascade: true,
  })
  policiaisEnvolvidos: OcorrenciaPolicial[];

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

  @Column({ name: "delegacia_destino", length: 60 })
  delegaciaDestino: string;

  @Column({ name: "delegado_responsavel", length: 100 })
  delegadoResponsavel: string;

  @Column({ name: "numero_procedimento", length: 50 })
  numeroProcedimento: string;

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn({ name: "endereco_id" })
  endereco: Endereco;
}
