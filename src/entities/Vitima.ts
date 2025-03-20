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
import { Endereco } from "./Endereco";

@Entity("presos")
export class Vitima {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 20 })
  cpf: string;

  @Column({ name: "data_nascimento", length: 20 })
  dataNascimento: string;

  @Column({ name: "nome_mae", length: 100 })
  nomeMae: string;

  @Column({ name: "nome_pai", length: 100 })
  nomePai: string;

  @Column({ length: 30 })
  naturalidade: string;

  @Column({ length: 30 })
  nacionalidade: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  ocorrencia: Ocorrencia;

  @OneToOne(() => Endereco)
  @JoinColumn()
  endereco: Endereco;
}
