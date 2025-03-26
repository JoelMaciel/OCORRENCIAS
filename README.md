# 🚔 Sistema de Gerenciamento de Ocorrências Policiais


**Sistema backend completo** para registro de ocorrências policiais desenvolvido com:

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Tipagem estática.
- **TypeORM**: ORM para banco de dados relacional.
-  **PostgreSQL**: Para persistencia de dados.
-  **DOCKER**: Executar o container do PostgreSQL.


---

### 🏷️ Estrutura Completa
| Campo               | Tipo/Descrição                          | Exemplo/Limite       |
|---------------------|----------------------------------------|---------------------|
| `id`                | UUID (Identificador único)             | `123e4567-e89b...`  |
| `mOcorrencia`       | Código identificador                   | 30 caracteres       |
| `dataHoraInicial`   | Data/hora de início                    | `YYYY-MM-DD HH:MM`  |
| `dataHoraFinal`     | Data/hora de encerramento              | `YYYY-MM-DD HH:MM`  |
| `tipoOcorrencia`    | Descrição do tipo                      | 100 caracteres      |
| `artigo`            | Artigo legal relacionado               | 50 caracteres       |
| `resumo`            | Descrição detalhada                    | Texto livre         |
| `status`            | **Status** (ver tabela abaixo)         |                     |

### 🔴 Status da Ocorrência
| Valor          | Emoji | Descrição               |
|----------------|-------|-------------------------|
| `PENDENTE`     | 🔴    | Padrão ao criar         |
| `EM_ANDAMENTO` | 🟡    | Em investigação         |
| `RESOLVIDA`    | 🟢    | Caso encerrado          |
| `ARQUIVADA`    | ⚫    | Sem solução identificada |

---

### 🔗 Relacionamentos Detalhados

#### 1. 👮 **Corpo de Guarda**
- `guardaQuartel` → Muitas ocorrências pertencem a um corpo.

#### 2. 🕵️ **Policiais**
- `registradoPor` → Policial que registrou a ocorrência  .
- `policiaisEnvolvidos` → Lista de policiais envolvidos .

#### 3. 🚓 **Recursos**
- `viatura` → Viatura associada .
- `armas` → Armas envolvidas.

#### 4. ⚖️ **Elementos da Ocorrência**
- `drogas` → Drogas apreendidas  
- `objetosApreendidos` → Objetos confiscados .
- `veiculos` → Veículos apreendidos . 

#### 5. 👥 **Pessoas**
- `acusados` → Lista de acusados. 
- `vitimas` → Lista de vítimas  .

---

### 📌 Informações Complementares
| Campo                     | Descrição                 |
|---------------------------|---------------------------|
| `delegaciaDestino`        | Delegacia responsável     |
| `delegadoResponsavel`     | Nome do delegado          |
| `numeroProcedimento`      | Número do processo        |
| `createdAt`/`updatedAt`   | Timestamps automáticos    |

---

## ⚙️ Como Utilizar
```bash
# Instalar dependências
npm install

# Executar migrações
npm run typeorm migration:run

# Iniciar o sistema
npm run dev

# Rodar o container do PostgreSQL
Crie um arquico docker-compose.yaml  na raiz do projeto,
configure para subir um container do postgreSQL,
execute o comando docker compose up -d
