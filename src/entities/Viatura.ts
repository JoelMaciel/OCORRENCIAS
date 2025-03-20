import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity("viaturas")
export class Viatura {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  prefixo: string;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column({ name: "unidade_policiamento" })
  unidadePoliciamento: string;

  @Column()
  status: string;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
