# 📚 API de Gestão de Livros e Leituras

Projeto desenvolvido para a disciplina de **Desenvolvimento de Serviços e APIs** do curso de Análise e Desenvolvimento de Sistemas.

A aplicação consiste em uma API RESTful completa com persistência de dados em SQL, autenticação JWT e regras de negócio para gestão de leituras pessoais.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript.
- **Express**: Framework para API.
- **SQLite3**: Banco de dados relacional leve e serverless.
- **JWT (JsonWebToken)**: Para autenticação segura.
- **BcryptJS**: Para criptografia de senhas.

## ⚙️ Funcionalidades

- **Autores**: CRUD completo (Listar e Criar).
- **Livros**: Cadastro com relacionamento (Foreign Key) para Autores.
- **Usuários**: Registro e Login (Geração de Token).
- **Leituras**:
  - Adicionar livro à estante pessoal.
  - Atualizar status de leitura (Lendo, Concluído).
  - Avaliar livros (Nota 1 a 5) - *Somente se o livro estiver na estante*.
- **Segurança**: Rotas de leitura protegidas via Middleware.

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado.
- Git instalado.

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/api-gestao-livros.git](https://github.com/SEU_USUARIO/api-gestao-livros.git)

   ## 🕵️ Guia Rápido de Testes (Insomnia)

Para testar a API, certifique-se de que o servidor está rodando.
**Base URL:** `http://127.0.0.1:3000`

### Passo 1: Criar um Autor
* **Método:** `POST`
* **Rota:** `/autores`
* **Body (JSON):**
  ```json
  {
    "nome": "George Orwell",
    "nacionalidade": "Britânico"
  }

### Passo 2: Criar um Livro
* **Método:** `POST`
* **Rota:** `/livros`
* **Body (JSON):**
  ```json
    {
    "titulo": "1984",
    "anoPublicacao": 1949,
    "genero": "Ficção",
    "numPaginas": 328,
    "autorId": "COLE_AQUI_O_ID_DO_AUTOR"
    }
⚠️ Importante: Copie o id do livro que será retornado.

### Passo 3: Cadastrar Usuário
* **Método:** `POST`
* **Rota:** `/auth/registro`
* **Body (JSON):**
  ```json
    {
    "nomeCompleto": "Aluno Teste",
    "email": "aluno@teste.com",
    "senha": "123"
    }

### Passo 4: Fazer Login (Gerar Token)
* **Método:** `POST`
* **Rota:** `/auth/login`
* **Body (JSON):**
  ```json
    {
    "email": "aluno@teste.com",
    "senha": "123"
    }
⚠️ Importante: Copie o código token que aparece na resposta. Ele é seu crachá de acesso.

### Passo 5: Registrar Leitura (Rota Protegida)
* **Método:** `POST`
* **Rota:** `/leituras`
* **Autenticação:** `Vá na aba Auth, selecione Bearer Token e cole o token do Passo 4`
* **Body (JSON):**
  ```json
    {
    "livroId": "COLE_AQUI_O_ID_DO_LIVRO",
    "status": "lendo"
    }

Desenvolvido por **Adriano Nunes dos Santos**