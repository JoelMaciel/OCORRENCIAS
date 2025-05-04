import { z } from "zod";
import { EnderecoSchema } from "./EnderecoSchema";

export const UpdateOcorrenciaSchema = z.object({
  mOcorrencia: z
    .string({ required_error: "O campo 'mOcorrencia' é obrigatório." })
    .min(6, { message: "O campo não pode estar vazio" })
    .max(30),

  dataHoraInicial: z
    .string({ required_error: "O campo 'dataHoraInicial' é obrigatório." })
    .min(6, { message: "O campo não pode estar vazio" }),

  dataHoraFinal: z
    .string({ required_error: "O campo 'dataHoraFinal' é obrigatório." })
    .min(6, { message: "O campo não pode estar vazio" }),

  tipoOcorrencia: z
    .string({ required_error: "O campo 'tipoOcorrencia' é obrigatório." })
    .min(4, { message: "O campo não pode estar vazio" })
    .max(100),

  artigo: z
    .string({ required_error: "O campo 'artigo' é obrigatório." })
    .min(5, { message: "O campo não pode estar vazio" })
    .max(50),
  resumo: z
    .string({ required_error: "O campo 'resumo' é obrigatório." })
    .min(15, { message: "O campo não pode estar vazio" }),
  endereco: EnderecoSchema,
});

export type UpdateOcorrenciaInput = z.infer<typeof UpdateOcorrenciaSchema>;
