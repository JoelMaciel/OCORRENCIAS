import { z } from "zod";

export const EnderecoSchema = z.object({
  rua: z
    .string({ required_error: "O campo rua é obrigatório." })
    .min(4, { message: "O campo 'rua' deve ter no minimo 4 caracteres." }),
  numero: z
    .string({ required_error: "O campo numero é obrigatório." })
    .min(2, { message: "O campo 'numero' deve ter no minimo 02 caracteres." }),
  complemento: z.string().optional(),
  bairro: z
    .string({ message: "O campo bairro é obrigatório." })
    .min(4, { message: "O campo 'bairro' deve ter no minimo 4 caracteres." }),
  cidade: z
    .string({ message: "O campo cidade é obrigatório." })
    .min(4, { message: "O campo 'cidade' deve ter no minimo 4 caracteres." }),
  uf: z
    .string({ message: "O campo uf é obrigatório." })
    .min(2, { message: "O campo 'uf' deve ter no minimo 2 caracteres." }),
  cep: z
    .string({ message: "O campo cep é obrigatório." })
    .min(6, { message: "O campo 'cep' deve ter no minimo 6 caracteres." }),
});
