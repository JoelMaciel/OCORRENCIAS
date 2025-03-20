import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity("objeto_apreendido")
export class ObjetoApreendido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  descricao: string;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  calibre: string;

  @Column({ type: "int", nullable: true })
  quantidade: number;

  @Column({ nullable: true })
  condicao: string;

  @Column({ nullable: true })
  numeroSerie: string;

  @Column({ nullable: true })
  marca: string;

  @Column({ nullable: true })
  modelo: string;

  @Column({ nullable: true })
  CRAF: string;

  @Column({ nullable: true })
  dono: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.objetosApreendidos)
  ocorrencia: Ocorrencia;
}
