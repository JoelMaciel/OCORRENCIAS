import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity("veiculos_apreendidos")
export class VeiculoApreendido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column()
  cor: string;

  @Column()
  situacao: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
