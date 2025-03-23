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

@Entity("acusados")
export class Acusado {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ name: "data_nascimento", length: 10 })
  dataNascimento: string;

  @Column({ name: "nome_mae", length: 100 })
  nomeMae: string;

  @Column({ name: "nome_pai", length: 100 })
  nomePai: string;

  @Column({ length: 50 })
  naturalidade: string;

  @Column({ length: 50 })
  nacionalidade: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Ocorrencia)
  ocorrencia: Ocorrencia;

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn()
  endereco: Endereco;
}
