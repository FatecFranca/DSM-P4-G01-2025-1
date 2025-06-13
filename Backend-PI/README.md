# API para o Projeto Interdisciplinar 4° Semestre 

Esta é uma API simples para autenticação de usuários, com funcionalidades de registro e login, utilizando JWT (JSON Web Tokens) para autenticação, MongoDB como banco de dados e bcrypt para criptografia de senhas.

## 🔧 Funcionalidades

- **Registro de Usuário**: Permite que um novo usuário se cadastre na plataforma
- **Login de Usuário**: Permite que um usuário existente faça login e receba um token JWT para autenticação em outras rotas
- **Rotas protegidas**: Criação de middleware para proteção de rotas
- **Dados sobre o tempo de várias cidades**: API de previsão do tempo
- **Informações sobre o clima em tempo real**: Utilizando Arduino para medir a temperatura do ambiente em tempo real
- **Notícias sobre o clima do Brasil e do mundo**: API para buscar notícias sobre o tempo

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o servidor
- **Express.js**: Framework para construção da API
- **MongoDB**: Banco de dados NoSQL para armazenar dados dos usuários
- **Mongoose**: ODM (Mapeamento Objeto-Documento) para interagir com o MongoDB
- **Bcryptjs**: Biblioteca para criptografia e verificação de senhas
- **Jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT
- **Dotenv**: Para carregar variáveis de ambiente
- **Eslint**: Para padronização do projeto
- **Eslint-plugin-prettier**: Para correção de códigos
- **Husky**: Para automatizar checagem de qualidade antes dos commits

## ⁉️ Pré-requisitos

Antes de executar a aplicação, certifique-se de ter instalado:
- Node.js (versão 14 ou superior)
- MongoDB (local ou via MongoDB Atlas)

## 🛠️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Akcio23/PI-4-semestre
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env` na raiz do projeto com as variáveis:**
   ```env
   DATABASE_URL=mongodb://localhost:27017/nome-do-banco
   KEY=sua-chave-secreta
   PORT=XXXX
   REACT_APP_API_URL=http://localhost:XXXX
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## 🔗 Endpoints

### Autenticação

#### POST `/login/signup`
Registra um novo usuário.

**Corpo da requisição:**
```json
{  
  "user": "nome-do-usuário",  
  "email": "email@dominio.com",  
  "password": "senha",  
  "confirmedPassword": "senha"
}  
```

**Respostas:**
- **Sucesso (200):**
  ```json
  { "message": "Usuário criado com sucesso" }  
  ```
- **Erro (400):**
  ```json
  { "message": "Erro ao criar usuário" }  
  ```
***

#### POST `/login/signin`
Autentica um usuário existente.

**Corpo da requisição:**
```json
{  
  "email": "email@dominio.com",  
  "password": "senha"  
}
```

**Respostas:**
- **Sucesso (200):**
  ```json
  { "token": "token-jwt-gerado" }  
  ```
- **Erro (400):**
  ```json
  { "message": "Credenciais inválidas" }
  ```
***
### Usuários

#### POST `/user`
Buscar usuário autenticado.

**Headers:**
```
Authorization: Bearer TOKENJWT
```

**Corpo da requisição:**
```json
{
  "email": "email@dominio.com"
}
```

**Respostas:**
- **Sucesso (200):**
  ```json
  { "user": {...} }
  ```
- **Erro (401):**
  ```json
  { "message": "Unauthorized" }
  ```
  ***

### Clima e Tempo

#### GET `/api/hg?city=franca-sp`
Buscar informações climáticas de uma cidade.

**Parâmetros de consulta:**
- `city` (obrigatório): Nome da cidade (ex: "franca-sp")

**Respostas:**
- **Sucesso (200):**
  ```json
  { "data": {...} }
  ```
- **Erro (400):**
  ```json
  { "error": "field city required" }
  ```
***

#### GET `/api/temp`
Buscar temperatura em tempo real (Arduino).

**Respostas:**
- **Sucesso (200):**
  ```json
  {
    "data": "07/06/2025",
    "hora": "12:38",
    "temperatura": "26°C",
    "umidade": "49%"
  }
  ```
- **Erro (500):**
  ```json
  { "error": "Erro ao buscar temperatura" }
  ```
***
### Notícias

#### GET `/api/news`
Buscar notícias sobre clima.

**Respostas:**
- **Sucesso (200):**
  ```json
  [
    {
      "titulo": "Instabilidade muda o clima de norte a sul | Previsão para segunda, 09 de junho",
      "link": "https://www.climatempo.com.br/noticia/frio/instabilidade-muda-o-clima-de-norte-a-sul-previsao-para-segunda-09-de-junho",
      "imagem": "https://statics.climatempo.com.br/sites/1/2025/05/Domingo.png"
    }
  ]
  ```
- **Erro (500):**
  ```json
  { "error": "Erro ao obter notícias" }
  ```

## 📁 Estrutura do Projeto

```
├── src/backend/
│   ├── controllers/       # Lógica dos controladores
│   ├── middlewares/       # Middlewares (ex: autenticação)
│   ├── models/            # Modelos do banco de dados
│   ├── routes/            # Definição das rotas da API
│   ├── serializers/       # Serialização de dados  
│   ├── service/           # Lógica de negócios/services
│   ├── utils/             # Utilitários/helpers
│   └── server.js          # Arquivo principal do servidor
├── .env                   # Variáveis de ambiente
└── package.json           # Dependências do projeto
```

## 📝 Notas Importantes

- Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env`
- Mantenha sua chave JWT (`KEY`) segura e não a compartilhe
- Para rotas protegidas, inclua sempre o token JWT no header `Authorization`
- A API utiliza conexão com Arduino para dados de temperatura em tempo real
