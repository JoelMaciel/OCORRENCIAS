import { z } from "zod";

export const CreatePolicialSchema = z.object({
  nome: z.string({ message: "O campo 'nome' é obrigatório." }),
  matricula: z.string({ message: "O campo 'matricula' é obrigatório." }),
  postoGraduacao: z.string({ message: "O campo postoGradução é obrigatório" }),
});
