export interface IOcorrenciaPolicialRepository {
  associatePoliciaisToOcorrencia(ocorrenciaId: string, policiaisIds: string[]): Promise<void>;
}
