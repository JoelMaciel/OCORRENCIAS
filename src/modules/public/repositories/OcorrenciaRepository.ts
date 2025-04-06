import { Ocorrencia } from "../entities/Ocorrencia";
import { AppDataSource } from "../../../../ormconfig";
import { IOcorrenciaRepository } from "./interfaces/IOcorrenciaRepository";
import { number } from "zod";

export class OcorrenciaRepository implements IOcorrenciaRepository {
  constructor(private readonly ocorrenciaRepository = AppDataSource.getRepository(Ocorrencia)) {}

  public async create(data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = this.ocorrenciaRepository.create(data);

    const savedOcorrencia = await this.ocorrenciaRepository.save(ocorrencia);

    return savedOcorrencia;
  }

  public async findAll(
    page: number = 1,
    limit: number = 10,
    mOcorrencia?: string,
    prefixoViatura?: string,
    dataHoraInicial?: string,
    dataHoraFinal?: string,
    status?: string
  ): Promise<[Ocorrencia[], number]> {
    const skip = (page - 1) * limit;

    const query = this.ocorrenciaRepository
      .createQueryBuilder("ocorrencia")
      .select([
        "ocorrencia.id",
        "ocorrencia.mOcorrencia",
        "ocorrencia.dataHoraInicial",
        "ocorrencia.dataHoraFinal",
        "ocorrencia.status",
      ])
      .leftJoinAndSelect("ocorrencia.corpoGuarda", "corpoGuarda")
      .leftJoinAndSelect("corpoGuarda.comandante", "comandante")
      .leftJoinAndSelect("ocorrencia.registradoPor", "registradoPor")
      .leftJoinAndSelect("ocorrencia.viatura", "viatura")
      .leftJoinAndSelect("ocorrencia.policiaisEnvolvidos", "policiaisEnvolvidos")
      .leftJoinAndSelect("policiaisEnvolvidos.policial", "policial")
      .skip(skip)
      .take(limit);

    if (mOcorrencia) {
      query.andWhere("ocorrencia.mOcorrencia ILIKE :mOcorrencia", {
        mOcorrencia: `%${mOcorrencia}`,
      });
    }

    if (status) {
      query.andWhere("ocorrencia.status = :status", { status });
    }

    if (prefixoViatura) {
      query.andWhere("viatura.prefixo ILIKE :prefixoViatura", {
        prefixoViatura: `%${prefixoViatura}`,
      });
    }

    if (dataHoraInicial && dataHoraFinal) {
      query.andWhere("ocorrencia.dataHoraInicial BETWEEN :dataHoraInicial AND :dataHoraFinal", {
        dataHoraInicial,
        dataHoraFinal,
      });
    } else if (dataHoraInicial) {
      query.andWhere("ocorrencia.dataHoraInicial >= :dataHoraInicial", { dataHoraInicial });
    } else if (dataHoraFinal) {
      query.andWhere("ocorrencia.dataHoraInicial <= :dataHoraFinal", { dataHoraFinal });
    }

    return await query.getManyAndCount();
  }

  public async update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = await this.ocorrenciaRepository
      .createQueryBuilder("ocorrencia")
      .leftJoinAndSelect("ocorrencia.corpoGuarda", "corpoGuarda")
      .leftJoinAndSelect("corpoGuarda.comandante", "comandante")
      .leftJoinAndSelect("ocorrencia.policiaisEnvolvidos", "policiaisEnvolvidos")
      .leftJoinAndSelect("policiaisEnvolvidos.policial", "policial")
      .where("ocorrencia.id = :id", { id })
      .getOneOrFail();

    await this.ocorrenciaRepository
      .createQueryBuilder()
      .update(Ocorrencia)
      .set(data)
      .where("id = :id", { id })
      .execute();

    return await this.ocorrenciaRepository.findOneOrFail({
      where: { id },
      relations: [
        "corpoGuarda",
        "corpoGuarda.comandante",
        "policiaisEnvolvidos",
        "policiaisEnvolvidos.policial",
      ],
    });
  }

  public async findById(id: string): Promise<Ocorrencia | null> {
    return await this.ocorrenciaRepository
      .createQueryBuilder("ocorrencia")
      .leftJoinAndSelect("ocorrencia.corpoGuarda", "corpoGuarda")
      .leftJoinAndSelect("corpoGuarda.comandante", "comandante")
      .leftJoinAndSelect("ocorrencia.policiaisEnvolvidos", "policiaisEnvolvidos")
      .leftJoinAndSelect("ocorrencia.registradoPor", "registradoPor")
      .leftJoinAndSelect("policiaisEnvolvidos.policial", "policial")
      .leftJoinAndSelect("ocorrencia.viatura", "viatura")
      .select([
        "ocorrencia.id",
        "ocorrencia.mOcorrencia",
        "ocorrencia.dataHoraInicial",
        "ocorrencia.dataHoraFinal",
        "ocorrencia.tipoOcorrencia",
        "ocorrencia.artigo",
        "ocorrencia.resumo",
        "ocorrencia.status",
        "ocorrencia.createdAt",
        "ocorrencia.updatedAt",
        "ocorrencia.delegaciaDestino",
        "ocorrencia.delegadoResponsavel",
        "ocorrencia.numeroProcedimento",
        "corpoGuarda.id",
        "corpoGuarda.dataCriacao",
        "corpoGuarda.dataAtualizacao",
        "comandante.id",
        "comandante.nome",
        "comandante.matricula",
        "comandante.id",
        "comandante.nome",
        "policiaisEnvolvidos.id",
        "policial.matricula",
        "policial.nome",
        "registradoPor.id",
        "registradoPor.nome",
        "registradoPor.matricula",
        "viatura.id",
        "viatura.prefixo",
      ])
      .where("ocorrencia.id = :id", { id })
      .getOne();
  }

  public async existsByMOcorrencia(mOcorrencia: string): Promise<boolean> {
    const ocorrenciaExistente = await this.ocorrenciaRepository.findOne({
      where: { mOcorrencia },
    });

    return !!ocorrenciaExistente;
  }
}
