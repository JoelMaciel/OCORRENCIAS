import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Policial } from "./Policial";
import { CorpoGuarda } from "./CorpoGuarda";
import { Endereco } from "./Endereco";

@Entity("batalhoes")
export class Batalhao {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nome: string;

  @CreateDateColumn({ name: "data_criacao" })
  dataCriacao: Date;

  @UpdateDateColumn({ name: "data_atualizacao" })
  dataAtualizacao: Date;

  @OneToMany(() => CorpoGuarda, (guarda) => guarda.batalhao)
  corposGuarda: CorpoGuarda[];

  @ManyToMany(() => Policial, (policial) => policial.batalhoes)
  policiais: Policial[];

  @OneToOne(() => Endereco)
  @JoinColumn()
  endereco: Endereco;
}
