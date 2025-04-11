import { AppDataSource } from "../../../../ormconfig";
import { Endereco } from "../entities/Endereco";
import { IEnderecoRepository } from "./interfaces/IEnderecoRepository";

export class EnderecoRepository implements IEnderecoRepository {
  constructor(private readonly enderecoRepository = AppDataSource.getRepository(Endereco)) {}

  public async delete(id: string): Promise<void> {
    await this.enderecoRepository.delete(id);
  }
}
