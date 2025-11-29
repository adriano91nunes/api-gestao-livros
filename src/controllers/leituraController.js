const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// 1. REGISTRAR OU ATUALIZAR LEITURA (Status: a ler, lendo, concluído)
const registrarLeitura = (req, res) => {
    const usuarioId = req.usuarioId; // ID pego automaticamente pelo Token
    const { livroId, status } = req.body;

    if (!livroId || !status) {
        return res.status(400).json({ error: 'Livro e Status são obrigatórios' });
    }

    // Verifica se já existe esse livro na lista do usuário
    db.get('SELECT * FROM leituras WHERE usuario_id = ? AND livro_id = ?', [usuarioId, livroId], (err, leitura) => {
        if (err) return res.status(500).json({ error: err.message });

        if (leitura) {
            // Se já existe, ATUALIZA o status (UPDATE)
            const sqlUpdate = 'UPDATE leituras SET status = ? WHERE id = ?';
            db.run(sqlUpdate, [status, leitura.id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Status de leitura atualizado!', status });
            });
        } else {
            // Se não existe, CRIA um novo registro (INSERT)
            const id = uuidv4();
            const sqlInsert = 'INSERT INTO leituras (id, usuario_id, livro_id, status) VALUES (?, ?, ?, ?)';
            db.run(sqlInsert, [id, usuarioId, livroId, status], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Livro adicionado à lista!', status });
            });
        }
    });
};

// 2. AVALIAR UM LIVRO (Nota 1 a 5)
const avaliarLivro = (req, res) => {
    const usuarioId = req.usuarioId;
    const { livroId } = req.params; // ID do livro vem na URL
    const { nota } = req.body;

    if (nota < 1 || nota > 5) {
        return res.status(400).json({ error: 'A nota deve ser entre 1 e 5' });
    }

    // Só pode avaliar se o livro estiver na lista de leitura
    const sql = 'UPDATE leituras SET avaliacao = ? WHERE usuario_id = ? AND livro_id = ?';
    
    db.run(sql, [nota, usuarioId, livroId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Livro não encontrado na sua lista de leitura.' });
        }
        
        res.json({ message: 'Avaliação registrada com sucesso!', nota });
    });
};

// 3. MINHAS LEITURAS (Regra: cada usuário vê somente as suas)
const getMinhasLeituras = (req, res) => {
    const usuarioId = req.usuarioId;

    // Join para trazer os dados do Livro junto com a Leitura
    const sql = `
        SELECT leituras.status, leituras.avaliacao, livros.titulo, livros.genero 
        FROM leituras
        JOIN livros ON leituras.livro_id = livros.id
        WHERE leituras.usuario_id = ?
    `;

    db.all(sql, [usuarioId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

module.exports = { registrarLeitura, avaliarLivro, getMinhasLeituras };