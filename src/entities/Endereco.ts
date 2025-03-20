import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Acusado } from "./Acusado";

@Entity("enderecos")
export class Endereco {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ name: "uf" })
  uf: string;

  @Column()
  cep: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
