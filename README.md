# 📦 API CEP — Cache inteligente da ViaCEP

Uma API simples, porém eficiente, desenvolvida para consultar e armazenar em cache os dados fornecidos pelo serviço público [ViaCEP](https://viacep.com.br).  
O objetivo é reduzir o número de requisições externas, melhorar a performance e otimizar o consumo de recursos, especialmente em aplicações que realizam buscas frequentes por CEPs.

---

## 🧩 Resumo do projeto

A **API CEP** foi criada com base na ideia de minimizar latência e carga sobre a API pública, oferecendo uma camada intermediária que:

-  Consulta o **ViaCEP** apenas quando necessário.
-  **Armazena em cache** as respostas por um tempo configurável.
-  Entrega dados de forma imediata nas requisições subsequentes.

---

## ⚙️ Requisitos

Antes de executar o projeto, é necessário ter instalado:

-  [Node.js](https://nodejs.org) (versão **22.18.0** ou superior recomendada)
-  [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

Além disso, utilize o arquivo **`.envexample`** como modelo para criar seu próprio arquivo **`.env`**, definindo variáveis de ambiente como:

-  Porta do servidor (`PORT`)
-  Token de autenticação (`AUTH_TOKEN`)
-  Tempo de cache (`CACHE_TTL`)

Essas variáveis permitem ajustar facilmente o comportamento da aplicação conforme o ambiente (desenvolvimento, teste ou produção).

---

## 🧾 Versões utilizadas

As versões recomendadas são as mesmas usadas durante o desenvolvimento e testes do projeto:

```bash
node --version
v22.18.0

npm --version
10.9.3
```

> ⚠️ É altamente recomendado manter as mesmas versões para evitar conflitos de dependências e comportamento inesperado de bibliotecas.

---

## 🚀 Instalação do projeto

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/danielguirra/desafio-node.git
cd desafio-node
npm install
```

Isso instalará automaticamente todas as bibliotecas necessárias, incluindo o Express, módulos de cache e utilitários para manipulação de requisições HTTP.

---

## 🛠️ Build do projeto

Antes de executar, é necessário gerar os arquivos compilados do TypeScript:

```bash
npm run build
```

O comando acima compila todos os arquivos `.ts` da pasta `src/` e gera a versão em JavaScript dentro do diretório `dist/`.

---

## ▶️ Execução da aplicação

Após o build, execute o servidor:

```bash
npm run start
```

A API será iniciada (por padrão) na porta `3000`, e você poderá realizar requisições via **HTTP**.
Se quiser alterar a porta, basta ajustar a variável `PORT` no arquivo `.env`.

Exemplo de log de inicialização:

```
🚀 Servidor iniciado em http://localhost:3000
💾 Cache ativo: TTL = 5 minutos
🔒 Token configurado: ativo
```

---

## 🧠 Exemplo de requisição

Use **cURL** ou qualquer cliente HTTP (como Postman, Insomnia ou HTTPie) para testar:

```bash
curl --location --request POST 'http://localhost:3000/cep/14407-411' \
--header 'Authorization: Bearer tokensuperseguro12314'
```

**Resposta esperada (JSON):**

```json
{
   "cep": "14407-411",
   "logradouro": "Rua Manoel Custódio da Silveira",
   "complemento": "até 898/899",
   "unidade": "",
   "bairro": "Jardim Vera Cruz III",
   "localidade": "Franca",
   "uf": "SP",
   "estado": "São Paulo",
   "regiao": "Sudeste",
   "ibge": "3516200",
   "gia": "3104",
   "ddd": "16",
   "siafi": "6425",
   "cached": false
}
```

> 🔁 A primeira requisição realiza a consulta real no ViaCEP.
> As próximas são servidas instantaneamente a partir do cache, com o campo `"cached": true`.

---

## 📚 Estrutura do projeto

A estrutura básica da aplicação segue o padrão:

```
.
├── src/
│   ├── server.ts        # Inicialização do servidor e rotas principais
│   ├── cache.ts         # Configuração e controle de cache
│   └── routes/
│       └── cep.routes.ts # Rota principal de busca por CEP
├── dist/                # Código compilado (build)
├── .envexample          # Exemplo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

Essa estrutura facilita a manutenção e a escalabilidade, permitindo adicionar novas rotas e funcionalidades sem comprometer o núcleo do projeto.

---

## 🧩 Tecnologias e bibliotecas utilizadas

-  **TypeScript** — tipagem estática e maior segurança no código.
-  **Express.js** — framework web rápido e minimalista.
-  **axios** — consumo da API ViaCEP.
-  **apicache** — sistema de cache simples e eficiente.
-  **dotenv** — carregamento seguro das variáveis de ambiente.

Essas ferramentas tornam o projeto robusto, de fácil leitura e altamente extensível.

---

## 🧰 Testes e validação

Para validar o funcionamento do cache, basta:

1. Fazer uma requisição para um CEP válido.
2. Repetir a mesma requisição dentro do período configurado no cache.
3. Verificar no cabeçalho ou corpo da resposta se o cache foi utilizado (`cached: true`).

Caso o tempo de cache expire, a API fará uma nova consulta no ViaCEP e atualizará os dados automaticamente.

---

## 🧾 Logs e monitoramento

Durante a execução, a aplicação registra logs informativos, incluindo:

-  CEPs consultados
-  Origem dos dados (cache ou API externa)
-  Tempo de resposta
-  Erros de autenticação ou formatação

Esses logs são úteis para auditoria, otimização de desempenho e depuração.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](https://choosealicense.com/licenses/mit/).
Você pode usá-lo, modificá-lo e distribuí-lo livremente, desde que mantenha os créditos originais.

---

## 👨‍💻 Autor

**Daniel Guirra**
📧 [daniel.guirra777@gmail.com](mailto:daniel.guirra777@gmail.com)
🔗 [GitHub](https://github.com/danielguirra)
💼 [LinkedIn](https://www.linkedin.com/in/daniel-guirra-ba4202331/)

