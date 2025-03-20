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
import { UnidadeMedida } from "../enums/UnidadeMedida";

@Entity("drogas")
export class Droga {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tipo: string;

  @Column()
  quantidade: string;

  @Column({ name: "unidade_medida", type: "enum", enum: UnidadeMedida })
  unidadeMedida: UnidadeMedida;

  @CreateDateColumn({ name: "created-at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
