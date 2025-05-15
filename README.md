# Gerenciamento de Salas

Este projeto é uma API para gerenciamento de laboratórios, permite o cadastro de usuários, criação de laboratórios com fotos, geração de relatórios em PDF e autenticação com JWT.
 ```
https://gerenciar-salas-five.vercel.app/
 ```
## Funcionalidades

- **Autenticação de Usuário:**
  - Registro e login de usuários com autenticação JWT.
- **Gerenciamento de Laboratórios:**
  - Criação de laboratórios com ou sem foto.
  - Listagem de laboratórios.
  - Geração de relatórios em PDF, acessível apenas em dias úteis.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- JWT para autenticação
- Multer para upload de arquivos
- PDFKit para geração de PDFs

## Configuração do Ambiente

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/franclindo/gerenciamento-salas.git
   cd gerenciamento-salas
   ```

2. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados:**
   - Configure o MongoDB e adicione a URI de conexão no arquivo `.env`.

4. **Variáveis de Ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
     ```
     MONGO_URI=seu_mongo_uri
     JWT_SECRET=seu_jwt_secret
     PORT=5000
     ```

## Configuração do Arquivo .env

Para que a aplicação funcione corretamente, é necessário configurar um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

- **MONGO_URI**: A URI de conexão para o seu banco de dados MongoDB.
  - Exemplo: `MONGO_URI=mongodb://usuario:senha@host:porta/nome_do_banco`

- **JWT_SECRET**: Uma chave secreta usada para assinar os tokens JWT.
  - Exemplo: `JWT_SECRET=sua_chave_secreta`

- **PORT**: A porta em que o servidor irá rodar.
  - Exemplo: `PORT=5000`

Certifique-se de que o arquivo `.env` está incluído no `.gitignore` para evitar que informações sensíveis sejam expostas no controle de versão.

## Executando o Projeto

- **Modo de Desenvolvimento:**
  ```bash
  npm run dev
  ```

- **Modo de Produção:**
  ```bash
  npm start
  ```

## Testes

- Execute os testes com o Jest:
  ```bash
  npm test
  ```

## Rotas da API

### Autenticação de Usuário

- **POST /api/usuario/register**
  - Registra um novo usuário.
  - Corpo da requisição: `{ "email": "usuario@example.com", "password": "senha" }`

- **POST /api/usuario/login**
  - Autentica um usuário existente e retorna um token JWT.
  - Corpo da requisição: `{ "email": "usuario@example.com", "password": "senha" }`

### Gerenciamento de Laboratórios

- **GET /api/laboratorio**
  - Lista todos os laboratórios cadastrados.

- **POST /api/laboratorio/novo**
  - Cria um novo laboratório.
  - Requer autenticação (token JWT).
  - Corpo da requisição: `{ "nome": "Nome do Laboratório", "descricao": "Descrição", "capacidade": 20 }`
  - Suporta upload de foto como multipart/form-data.

- **GET /api/laboratorio/relatorio**
  - Gera um relatório em PDF dos laboratórios.
  - Requer autenticação (token JWT) e só está acessível em dias úteis.

## Contribuição

Sinta-se à vontade para contribuir com o projeto através de pull requests.
