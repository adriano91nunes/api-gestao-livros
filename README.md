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