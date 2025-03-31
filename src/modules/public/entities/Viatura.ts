import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { StatusViatura } from "../enums/StatusViatura";
import { Batalhao } from "./Batalhao";

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

  @ManyToOne(() => Batalhao, (batalhao) => batalhao.viaturas)
  @JoinColumn({ name: "batalhao_id" })
  batalhao: Batalhao;

  @Column({
    type: "enum",
    enum: StatusViatura,
  })
  status: StatusViatura;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
