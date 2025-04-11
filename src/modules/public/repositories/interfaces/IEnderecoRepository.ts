export interface IEnderecoRepository {
  delete(id: string): Promise<void>;
}
