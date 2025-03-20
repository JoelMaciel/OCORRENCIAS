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

@Entity("armas")
export class Arma {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 80 })
  tipo: string;

  @Column({ length: 25 })
  calibre: string;

  @Column({ length: 80 })
  numeracao: string;

  @CreateDateColumn({ name: "created-at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
