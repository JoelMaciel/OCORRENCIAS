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

  @Column({ length: 100 })
  rua: string;

  @Column({ length: 20 })
  numero: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  complemento: string | null;
  @Column({ length: 80 })
  bairro: string;

  @Column({ length: 80 })
  cidade: string;

  @Column({ name: "uf", length: 3 })
  uf: string;

  @Column({ length: 20 })
  cep: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
