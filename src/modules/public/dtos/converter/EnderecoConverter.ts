import { z } from "zod";
import { EnderecoSchema } from "../schemas/EnderecoSchema";
import { Endereco } from "../../entities/Endereco";

export const toEnderecoEntity = (endereco: z.infer<typeof EnderecoSchema>): Endereco => {
  const enderecoEntity = new Endereco();
  enderecoEntity.rua = endereco.rua;
  enderecoEntity.numero = endereco.numero;
  enderecoEntity.complemento = endereco.complemento || null;
  enderecoEntity.bairro = endereco.bairro;
  enderecoEntity.cidade = endereco.cidade;
  enderecoEntity.uf = endereco.uf;
  enderecoEntity.cep = endereco.cep;
  enderecoEntity.createdAt = new Date();
  enderecoEntity.updatedAt = new Date();

  return enderecoEntity;
};
