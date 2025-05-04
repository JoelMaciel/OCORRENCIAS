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
    cidade?: string,
    bairro?: string,
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
        "ocorrencia.endereco",
      ])
      .leftJoinAndSelect("ocorrencia.corpoGuarda", "corpoGuarda")
      .leftJoinAndSelect("corpoGuarda.comandante", "comandante")
      .leftJoinAndSelect("ocorrencia.registradoPor", "registradoPor")
      .leftJoinAndSelect("ocorrencia.viatura", "viatura")
      .leftJoinAndSelect("ocorrencia.policiaisEnvolvidos", "policiaisEnvolvidos")
      .leftJoinAndSelect("policiaisEnvolvidos.policial", "policial")
      .leftJoinAndSelect("ocorrencia.endereco", "endereco")
      .skip(skip)
      .take(limit);

    if (mOcorrencia) {
      query.andWhere("ocorrencia.mOcorrencia ILIKE :mOcorrencia", {
        mOcorrencia: `%${mOcorrencia}%`,
      });
    }

    if (cidade) {
      query.andWhere("endereco.cidade ILIKE :cidade", {
        cidade: `%${cidade}%`,
      });
    }

    if (cidade && bairro) {
      query.andWhere("endereco.bairro ILIKE :bairro", {
        bairro: `%${bairro}%`,
      });
    }

    if (status) {
      query.andWhere("ocorrencia.status = :status", { status });
    }

    if (prefixoViatura) {
      query.andWhere("viatura.prefixo ILIKE :prefixoViatura", {
        prefixoViatura: `%${prefixoViatura}%`,
      });
    }

    if (dataHoraInicial && dataHoraFinal) {
      const [dateInicial, timeInicial] = dataHoraInicial.split(" ");
      const formattedDateInicial = dateInicial;
      const startTime = timeInicial ? timeInicial : "00:00";

      const [dateFinal, timeFinal] = dataHoraFinal.split(" ");
      const formattedDateFinal = dateFinal;
      const endTime = timeFinal ? timeFinal : "23:59";

      query.andWhere(
        "SUBSTRING(ocorrencia.dataHoraInicial FROM 1 FOR 10) >= :formattedDateInicial",
        {
          formattedDateInicial,
        }
      );

      if (timeInicial) {
        query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 12 FOR 5) >= :startTime", {
          startTime,
        });
      }

      query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 1 FOR 10) <= :formattedDateFinal", {
        formattedDateFinal,
      });

      if (timeFinal) {
        query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 12 FOR 5) <= :endTime", {
          endTime,
        });
      }
    } else if (dataHoraInicial) {
      const [datePart, timePart] = dataHoraInicial.split(" ");
      const formattedDate = datePart;
      const startTime = timePart ? timePart : "00:00";

      query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 1 FOR 10) = :formattedDate", {
        formattedDate,
      });

      if (timePart) {
        query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 12 FOR 5) >= :startTime", {
          startTime,
        });
      }
    } else if (dataHoraFinal) {
      const [datePart, timePart] = dataHoraFinal.split(" ");
      const formattedDate = datePart;
      const endTime = timePart ? timePart : "23:59";

      query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 1 FOR 10) = :formattedDate", {
        formattedDate,
      });

      if (timePart) {
        query.andWhere("SUBSTRING(ocorrencia.dataHoraInicial FROM 12 FOR 5) <= :endTime", {
          endTime,
        });
      }
    }

    return await query.getManyAndCount();
  }

  public async update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = await this.ocorrenciaRepository.findOneOrFail({
      where: { id },
      relations: [
        "corpoGuarda",
        "corpoGuarda.comandante",
        "policiaisEnvolvidos",
        "policiaisEnvolvidos.policial",
        "endereco",
      ],
    });

    this.ocorrenciaRepository.merge(ocorrencia, data);
    await this.ocorrenciaRepository.save(ocorrencia);
    return ocorrencia;
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
      .leftJoinAndSelect("ocorrencia.endereco", "endereco")
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
        "endereco.id",
        "endereco.rua",
        "endereco.numero",
        "endereco.complemento",
        "endereco.bairro",
        "endereco.cidade",
        "endereco.uf",
        "endereco.cep",
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
