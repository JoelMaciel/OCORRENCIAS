import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Policial } from "./Policial";
import { UserRole } from "../enums/UserRole";
import { MinLength } from "class-validator";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 30 })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  senha: string;

  @Column()
  role: UserRole;

  @OneToOne(() => Policial, (policial) => policial.usuario)
  @JoinColumn()
  policial: Policial;
}
