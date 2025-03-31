import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Policial } from "./Policial";
import { UserRole } from "../enums/UserRole";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 30 })
  senha: string;

  @Column()
  role: UserRole;

  @OneToOne(() => Policial, (policial) => policial.usuario)
  @JoinColumn()
  policial: Policial;
}
