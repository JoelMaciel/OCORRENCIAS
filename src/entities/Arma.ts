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

  @Column()
  tipo: string;

  @Column()
  calibre: string;

  @Column()
  numeracao: string;

  @CreateDateColumn({ name: "created-at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  @JoinColumn()
  ocorrencia: Ocorrencia;
}
