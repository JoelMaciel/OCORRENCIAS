# Sistema de Gerenciamento de Ocorrências Policiais

Este projeto é um sistema para gerenciamento de ocorrências policiais, desenvolvido com NodeJS , TypeORM e TypeScript.

## Entidade Ocorrência

A entidade principal do sistema é `Ocorrencia`, que representa um registro de ocorrência policial com todos os seus detalhes.

### Estrutura da Ocorrência

- **ID**: Identificador único (UUID)
- **Marca da Ocorrência (mOcorrencia)**: Código/identificação da ocorrência (30 caracteres)
- **Datas/Horas**:
  - `dataHoraInicial`: Quando a ocorrência começou
  - `dataHoraFinal`: Quando a ocorrência foi encerrada
- **Tipo de Ocorrência**: Descrição do tipo (100 caracteres)
- **Artigo**: Artigo legal relacionado (50 caracteres)
- **Resumo**: Descrição detalhada (texto)
- **Status**: Enum com valores:
  - `PENDENTE` (padrão)
  - `EM_ANDAMENTO`
  - `RESOLVIDA`
  - `ARQUIVADA`

### Relacionamentos

A ocorrência possui diversos relacionamentos com outras entidades:

1. **Corpo de Guarda**: Muitas ocorrências pertencem a um corpo de guarda (`guardaQuartel`)
2. **Policiais**:
   - Um policial registra a ocorrência (`registradoPor`)
   - Muitos policiais podem estar envolvidos (`policiaisEnvolvidos`)
3. **Recursos**:
   - Uma viatura associada (`viatura`)
   - Múltiplas armas envolvidas (`armas`)
4. **Elementos da Ocorrência**:
   - Drogas apreendidas (`drogas`)
   - Objetos apreendidos (`objetosApreendidos`)
   - Veículos apreendidos (`veiculos`)
5. **Pessoas envolvidas**:
   - Acusados (`acusados`)
   - Vítimas (`vitimas`)

### Informações Adicionais

- **Delegacia**: Destino da ocorrência (`delegaciaDestino`)
- **Delegado**: Responsável pelo caso (`delegadoResponsavel`)
- **Procedimento**: Número do procedimento (`numeroProcedimento`)
- **Timestamps**: 
  - `createdAt`: Quando o registro foi criado
  - `updatedAt`: Última atualização

## Como Utilizar

1. Instale as dependências:
```bash
npm install
