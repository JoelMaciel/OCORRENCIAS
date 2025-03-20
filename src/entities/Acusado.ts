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
export class Acusado {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ name: "data_nascimento" })
  dataNascimento: string;

  @Column({ name: "nome_mae" })
  nomeMae: string;

  @Column({ name: "nome_pai" })
  nomePai: string;

  @Column()
  naturalidade: string;

  @Column()
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
