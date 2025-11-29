const express = require('express');
const app = express();

app.use(express.json());

// Importação dos Controllers
const autorController = require('./src/controllers/autorController');
const livroController = require('./src/controllers/livroController');
const usuarioController = require('./src/controllers/usuarioController');
const leituraController = require('./src/controllers/leituraController'); // <--- NOVO

// Importação do Middleware de Segurança
const autenticacao = require('./src/middlewares/auth'); // <--- NOVO

// --- ROTAS PÚBLICAS ---
app.get('/autores', autorController.listarAutores);
app.post('/autores', autorController.criarAutor);

app.post('/livros', livroController.criarLivro);
app.get('/livros', livroController.listarLivros);
app.get('/livros/:id', livroController.buscarLivroPorId);

app.post('/auth/registro', usuarioController.registrarUsuario);
app.post('/auth/login', usuarioController.login);

// --- ROTAS PRIVADAS (Precisam de Login) ---
// O comando 'autenticacao' ali no meio é o guarda que pede o Token

// 1. Adicionar livro na estante ou mudar status
app.post('/leituras', autenticacao, leituraController.registrarLeitura);

// 2. Ver minha estante
app.get('/minhas-leituras', autenticacao, leituraController.getMinhasLeituras);

// 3. Avaliar um livro (passando o ID do livro na URL)
app.post('/leituras/:livroId/avaliacao', autenticacao, leituraController.avaliarLivro);


const PORT = 3000;
// Adicionamos o '0.0.0.0' para ele ouvir em todas as interfaces de rede do Linux
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});