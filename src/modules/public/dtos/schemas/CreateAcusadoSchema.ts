import { z } from "zod";
import { EnderecoSchema } from "./EnderecoSchema";

export const CreateAcusadoSchema = z.object({
  nome: z
    .string({ message: "O campo 'nome' é obrigatório." })
    .min(15, { message: "O campo 'nome' deve ter no minimo 15 caracteres." }),
  cpf: z
    .string({ required_error: "O campo 'cpf' é obrigatório." })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "O campo 'cpf' deve estar no formato válido (ex.: 123.456.789-00).",
    }),
  dataNascimento: z
    .string({ message: "O campo 'dataNascimento' é obrigatório." })
    .min(10, { message: "O campo 'dataNascimento' deve ter no minimo 10 caracteres." }),
  nomeMae: z
    .string({ message: "O campo 'nomeMae' é obrigatório." })
    .min(15, { message: "O campo 'nomeMae' deve ter no minimo 15 caracteres." }),
  nomePai: z.string({ message: "O campo 'nomePai' deve ser uma string válida." }).optional(),
  naturalidade: z
    .string({ message: "O campo 'naturalidade' é obrigatório." })
    .min(4, { message: "O campo 'naturalidade' deve ter no minimo 8 caracteres." }),
  nacionalidade: z
    .string({ message: "O campo 'nacionalidade' é obrigatório." })
    .min(6, { message: "O campo 'nacionalidade' deve ter no minimo 6 caracteres." }),
  endereco: EnderecoSchema,
});

export type AcusadoRequestDTO = z.infer<typeof CreateAcusadoSchema>;
