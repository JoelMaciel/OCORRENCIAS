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

  @Column({ length: 20 })
  placa: string;

  @Column({ length: 30 })
  modelo: string;

  @Column({ length: 20 })
  cor: string;

  @Column({ length: 200 })
  situacao: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
