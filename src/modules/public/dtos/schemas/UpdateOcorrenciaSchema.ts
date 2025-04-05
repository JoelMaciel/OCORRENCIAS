import { z } from "zod";
import { EnderecoSchema } from "./EnderecoSchema";

export const UpdateOcorrenciaSchema = z.object({
  mOcorrencia: z.string({ required_error: "O campo 'mOcorrencia' é obrigatório." }).max(30),
  dataHoraInicial: z.string({ required_error: "O campo 'dataHoraInicial' é obrigatório." }),
  dataHoraFinal: z.string({ required_error: "O campo 'dataHoraFinal' é obrigatório." }),
  tipoOcorrencia: z.string({ required_error: "O campo 'tipoOcorrencia' é obrigatório." }).max(100),
  artigo: z.string({ required_error: "O campo 'artigo' é obrigatório." }).max(50),
  resumo: z.string({ required_error: "O campo 'resumo' é obrigatório." }),
  registradoPorId: z
    .string({ required_error: "O campo 'registradoPorId' é obrigatório." })
    .uuid({ message: "Cada policial deve ser um UUID válido" }),
  endereco: EnderecoSchema,
});

export type UpdateOcorrenciaInput = z.infer<typeof UpdateOcorrenciaSchema>;
