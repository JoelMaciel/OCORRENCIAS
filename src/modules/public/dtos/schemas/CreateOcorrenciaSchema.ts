import { z } from "zod";
import { StatusOcorrencia } from "../../enums/StatusOcorrencia";

export const CreateOcorrenciaSchema = z.object({
  mOcorrencia: z.string({ required_error: "O campo 'mOcorrencia' é obrigatório." }).max(30),
  dataHoraInicial: z
    .string({ required_error: "O campo 'dataHoraInicial' é obrigatório." })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "O campo 'dataHoraInicial' deve ser uma data válida no formato ISO 8601.",
    }),
  dataHoraFinal: z
    .string({ required_error: "O campo 'dataHoraFinal' é obrigatório." })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "O campo 'dataHoraFinal' deve ser uma data válida no formato ISO 8601.",
    }),
  tipoOcorrencia: z.string({ required_error: "O campo 'tipoOcorrencia' é obrigatório." }).max(100),
  artigo: z.string({ required_error: "O campo 'artigo' é obrigatório." }).max(50),
  resumo: z.string({ required_error: "O campo 'resumo' é obrigatório." }),
  status: z.nativeEnum(StatusOcorrencia, { required_error: "O campo 'status' é obrigatório." }),
  registradoPorId: z
    .string({ required_error: "O campo 'registradoPorId' é obrigatório." })
    .uuid({ message: "Cada policial deve ser um UUID válido" }),
  guardaQuartelId: z
    .string({ required_error: "O campo 'guardaQuartelId' é obrigatório." })
    .uuid({ message: "Cada policial deve ser um UUID válido" }),
  delegaciaDestino: z
    .string({ required_error: "O campo 'delegaciaDestino' é obrigatório." })
    .max(30),
  delegadoResponsavel: z
    .string({ required_error: "O campo 'delegadoResponsavel' é obrigatório." })
    .max(100),
  numeroProcedimento: z
    .string({ required_error: "O campo 'numeroProcedimento' é obrigatório." })
    .max(50),
  policiaisEnvolvidos: z.array(
    z
      .string({ required_error: "Os IDs dos policiais envolvidos devem ser UUIDs válidos." })
      .uuid({ message: "Cada policial deve ser um UUID válido" })
  ),
  viaturaId: z
    .string({ required_error: "O campo 'viaturaId' é obrigatório." })
    .uuid({ message: "Cada policial deve ser um UUID válido" }),
});
