const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// 1. Criar Livro (Precisa verificar se o Autor existe!)
const criarLivro = (req, res) => {
    const { titulo, anoPublicacao, genero, numPaginas, autorId } = req.body;

    // Validação básica
    if (!titulo || !autorId) {
        return res.status(400).json({ error: "Título e ID do Autor são obrigatórios" });
    }

    // VERIFICAÇÃO DE CHAVE ESTRANGEIRA (Foreign Key) MANUAL
    // Antes de salvar, vamos ver se esse autor existe mesmo no banco
    db.get('SELECT id FROM autores WHERE id = ?', [autorId], (err, autor) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (!autor) {
            return res.status(404).json({ error: 'Autor não encontrado! Não é possível cadastrar o livro.' });
        }

        // Se o autor existe, podemos salvar o livro
        const id = uuidv4();
        const sql = `
            INSERT INTO livros (id, titulo, ano_publicacao, genero, num_paginas, autor_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(sql, [id, titulo, anoPublicacao, genero, numPaginas, autorId], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, titulo, autorId });
        });
    });
};

// 2. Listar todos os livros
const listarLivros = (req, res) => {
    db.all('SELECT * FROM livros', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// 3. Buscar Livro por ID (Com os dados do Autor JUNTOS)
const buscarLivroPorId = (req, res) => {
    const { id } = req.params;

    // AQUI ESTÁ A MÁGICA: O comando JOIN junta as tabelas
    const sql = `
        SELECT 
            livros.*, 
            autores.nome as autor_nome, 
            autores.nacionalidade as autor_nacionalidade
        FROM livros
        JOIN autores ON livros.autor_id = autores.id
        WHERE livros.id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (!row) return res.status(404).json({ error: 'Livro não encontrado' });

        // Vamos formatar bonito para o usuário (Organizar o objeto)
        const livroFormatado = {
            id: row.id,
            titulo: row.titulo,
            anoPublicacao: row.ano_publicacao,
            genero: row.genero,
            numPaginas: row.num_paginas,
            autor: { // Objeto aninhado, como pedido
                nome: row.autor_nome,
                nacionalidade: row.autor_nacionalidade
            }
        };

        res.json(livroFormatado);
    });
};

module.exports = { criarLivro, listarLivros, buscarLivroPorId };