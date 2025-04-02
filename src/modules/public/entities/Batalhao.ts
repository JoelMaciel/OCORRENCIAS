import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Policial } from "./Policial";
import { CorpoGuarda } from "./CorpoGuarda";
import { Endereco } from "./Endereco";
import { Viatura } from "./Viatura";

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

  @OneToMany(() => Policial, (policial) => policial.batalhao)
  policiais: Policial[];

  @OneToMany(() => Viatura, (viatura) => viatura.batalhao)
  viaturas: Viatura[];

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn({ name: "endereco_id" })
  endereco: Endereco;
}
