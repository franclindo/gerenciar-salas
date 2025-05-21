# Gerenciamento de Salas

Este projeto é uma API para gerenciamento de laboratórios, permite o cadastro de usuários, criação de laboratórios com fotos, geração de relatórios em PDF e autenticação com JWT.

<h2>Link da Aplicação</h2>
<a href="https://gerenciar-salas-five.vercel.app/">https://gerenciar-salas-five.vercel.app/</a>

<h2>Funcionalidades</h2>

<ul>
    <li><strong>Autenticação de Usuário:</strong>
        <ul>
            <li>Registro e login de usuários com autenticação JWT.</li>
        </ul>
    </li>
    <li><strong>Gerenciamento de Laboratórios:</strong>
        <ul>
            <li>Criação de laboratórios com ou sem foto.</li>
            <li>Listagem de laboratórios.</li>
            <li>Geração de relatórios em PDF, acessível apenas em dias úteis.</li>
        </ul>
    </li>
</ul>

<h2>Tecnologias Utilizadas</h2>

<ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>MongoDB</li>
    <li>JWT para autenticação</li>
    <li>Multer para upload de arquivos</li>
    <li>PDFKit para geração de PDFs</li>
</ul>

<h2>Configuração do Ambiente</h2>

<h3>1. Clone o Repositório:</h3>
<pre><code>git clone https://github.com/franclindo/gerenciamento-salas.git
cd gerenciamento-salas</code></pre>

<h3>2. Instale as Dependências:</h3>
<pre><code>npm install</code></pre>

<h3>3. Configuração do Banco de Dados:</h3>
<ul>
    <li>Configure o MongoDB e adicione a URI de conexão no arquivo <code>.env</code>.</li>
</ul>

<h3>4. Variáveis de Ambiente:</h3>
<ul>
    <li>Crie um arquivo <code>.env</code> na raiz do projeto e adicione as seguintes variáveis:</li>
</ul>
<pre><code>MONGO_URI=seu_mongo_uri
JWT_SECRET=seu_jwt_secret
PORT=5000</code></pre>

<h2>Configuração do Arquivo .env</h2>

<p>Para que a aplicação funcione corretamente, é necessário configurar um arquivo <code>.env</code> na raiz do projeto com as seguintes variáveis de ambiente:</p>

<ul>
    <li><strong>MONGO_URI:</strong> A URI de conexão para o seu banco de dados MongoDB.
        <ul>
            <li>Exemplo: <code>MONGO_URI=mongodb://usuario:senha@host:porta/nome_do_banco</code></li>
        </ul>
    </li>
    <li><strong>JWT_SECRET:</strong> Uma chave secreta usada para assinar os tokens JWT.
        <ul>
            <li>Exemplo: <code>JWT_SECRET=sua_chave_secreta</code></li>
        </ul>
    </li>
    <li><strong>PORT:</strong> A porta em que o servidor irá rodar.
        <ul>
            <li>Exemplo: <code>PORT=5000</code></li>
        </ul>
    </li>
</ul>

<h2>Executando o Projeto</h2>

<h3>Modo de Desenvolvimento:</h3>
<pre><code>npm run dev</code></pre>

<h3>Modo de Produção:</h3>
<pre><code>npm start</code></pre>

<h2>Testes</h2>

<p>Execute os testes com o Jest:</p>
<pre><code>npm test</code></pre>

<h2>Rotas da API</h2>

<table>
    <thead>
        <tr>
            <th>Endpoint</th>
            <th>Descrição</th>
            <th>Retorno</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>http://localhost:5000/api/usuario/register</td>
            <td>Registra um novo usuário, resposta em Json, com array de objetos</td>
            <td>
                <pre><code>{
    "email": "seuemail@gmail",
    "password": "senha123"
}</code></pre>
            </td>
        </tr>
        <tr>
            <td>http://localhost:5000/api/usuario/login</td>
            <td>Autentica um usuário existente e retorna um token JWT</td>
            <td>
                <pre><code>{
    "email": "usuario@example.com",
    "password": "senha"
}</code></pre>
            </td>
        </tr>
        <tr>
            <td>http://localhost:5000/api/laboratorio</td>
            <td>Lista todos os laboratórios cadastrados</td>
            <td>
                <pre><code>
    {
        "nome": "Laboratório 1",
        "descricao": "Descrição do laboratório",
        "capacidade": 20
    }
</code></pre>
            </td>
        </tr>
        <tr>
            <td>http://localhost:5000/api/laboratorio/novo</td>
            <td>Cria um novo laboratório (requer autenticação)</td>
            <td>
                <pre><code>{
    "nome": "Nome do Laboratório",
    "descricao": "Descrição",
    "capacidade": 20
}</code></pre>
            </td>
        </tr>
        <tr>
            <td>http://localhost:5000/api/laboratorio/relatorio</td>
            <td>Gera um relatório em PDF dos laboratórios (requer autenticação e só está acessível em dias úteis)</td>
            <td>
                <pre><code>PDF file</code></pre>
            </td>
        </tr>
    </tbody>
</table>

<h2>Contribuição</h2>

<p>Sinta-se à vontade para contribuir com o projeto através de pull requests.</p>
