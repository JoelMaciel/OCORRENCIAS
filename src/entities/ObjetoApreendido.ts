import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity("objeto_apreendido")
export class ObjetoApreendido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  descricao: string;

  @Column({ length: 80 })
  tipo: string;

  @Column({ nullable: true, length: 20 })
  calibre: string;

  @Column({ nullable: true, length: 20 })
  quantidade: string;

  @Column({ nullable: true, length: 100 })
  condicao: string;

  @Column({ nullable: true, length: 80 })
  numeroSerie: string;

  @Column({ nullable: true, length: 80 })
  marca: string;

  @Column({ nullable: true, length: 80 })
  modelo: string;

  @Column({ nullable: true, length: 50 })
  CRAF: string;

  @Column({ nullable: true, length: 100 })
  dono: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.objetosApreendidos)
  ocorrencia: Ocorrencia;
}
