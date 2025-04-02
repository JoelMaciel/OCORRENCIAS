import { z } from "zod";

export const CreatePolicialSchema = z.object({
  nome: z
    .string({ required_error: "O campo 'nome' é obrigatório." })
    .min(3, { message: "O campo 'nome' deve ter no mínimo 3 caracteres." })
    .max(100, { message: "O campo 'nome' deve ter no máximo 100 caracteres." }),

  matricula: z
    .string({ required_error: "O campo 'matricula' é obrigatório." })
    .min(5, { message: "O campo 'matricula' deve ter no mínimo 5 caracteres." })
    .max(30, { message: "O campo 'matricula' deve ter no máximo 30 caracteres." }),

  cpf: z
    .string({ required_error: "O campo 'cpf' é obrigatório." })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "O campo 'cpf' deve estar no formato válido (ex.: 123.456.789-00).",
    }),

  contato: z
    .string({ required_error: "O campo 'contato' é obrigatório." })
    .min(8, { message: "O campo 'contato' deve ter no mínimo 8 caracteres." })
    .max(15, { message: "O campo 'contato' deve ter no máximo 15 caracteres." }),

  email: z
    .string({ required_error: "O campo 'email' é obrigatório." })
    .email({ message: "O campo 'email' deve ser um endereço de email válido." })
    .max(50, { message: "O campo 'email' deve ter no máximo 50 caracteres." }),

  password: z
    .string({ required_error: "O campo 'password' é obrigatório." })
    .min(8, { message: "O campo 'password' deve ter no mínimo 8 caracteres." })
    .max(30, { message: "O campo 'password' deve ter no máximo 30 caracteres." }),

  postoGraduacao: z
    .string({ required_error: "O campo 'postoGraduacao' é obrigatório." })
    .min(3, { message: "O campo 'postoGraduacao' deve ter no mínimo 3 caracteres." })
    .max(30, { message: "O campo 'postoGraduacao' deve ter no máximo 30 caracteres." }),

  dataAdmissao: z
    .union([z.date(), z.string().transform((val) => new Date(val))])
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "A data de admissão deve ser uma data válida.",
    })
    .refine((date) => date <= new Date(), {
      message: "A data de admissão não pode ser uma data futura.",
    }),
});

export type CreatePolicialInput = z.infer<typeof CreatePolicialSchema>;
