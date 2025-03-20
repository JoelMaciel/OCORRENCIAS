import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity("viaturas")
export class Viatura {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  prefixo: string;

  @Column({ length: 20 })
  placa: string;

  @Column({ length: 30 })
  modelo: string;

  @Column({ name: "unidade_policiamento", length: 30 })
  unidadePoliciamento: string;

  @Column({ length: 20 })
  status: string;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
