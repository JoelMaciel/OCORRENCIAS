import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { Policial } from "./Policial";

@Entity("ocorrencias_policiais")
export class OcorrenciaPolicial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.policiaisEnvolvidos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ocorrencia_id" })
  ocorrencia: Ocorrencia;

  @ManyToOne(() => Policial, (policial) => policial.ocorrenciasEnvolvidas, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "policial_id" })
  policial: Policial;
}
