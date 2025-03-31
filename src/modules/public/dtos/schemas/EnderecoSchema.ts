import { z } from "zod";

export const EnderecoSchema = z.object({
  rua: z.string({ required_error: "O campo rua é obrigatório." }),
  numero: z.string({ required_error: "O campo numero é obrigatório." }),
  complemento: z.string().optional(),
  bairro: z.string({ message: "O campo bairro é obrigatório." }),
  cidade: z.string({ message: "O campo cidade é obrigatório." }),
  uf: z.string({ message: "O campo uf é obrigatório." }),
  cep: z.string({ message: "O campo cep é obrigatório." }),
});
