import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleType } from "../enums/RoleType";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.USUARIO })
  role: RoleType;
}
