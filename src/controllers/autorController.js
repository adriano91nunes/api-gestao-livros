const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// LISTAR (GET)
const listarAutores = (req, res) => {
    db.all('SELECT * FROM autores', [], (err, rows) => {
        if (err) {
            // SE TIVER ERRO, TEM QUE RESPONDER
            return res.status(500).json({ error: err.message });
        }
        // SE DER CERTO, TEM QUE RESPONDER
        res.json(rows);
    });
};

// CRIAR (POST)
const criarAutor = (req, res) => {
    console.log("1. Chegou no Controller"); // DEBUG
    const { nome, nacionalidade } = req.body;
    
    if (!nome || !nacionalidade) {
        return res.status(400).json({ error: "Nome e nacionalidade obrigatórios" });
    }

    const id = uuidv4();
    const sql = 'INSERT INTO autores (id, nome, nacionalidade) VALUES (?, ?, ?)';

    console.log("2. Tentando salvar no banco..."); // DEBUG

    db.run(sql, [id, nome, nacionalidade], function(err) {
        if (err) {
            console.log("3. Erro no banco:", err.message); // DEBUG
            return res.status(500).json({ error: err.message });
        }
        console.log("3. Sucesso! Respondendo ao cliente."); // DEBUG
        
        // ESSA LINHA É CRUCIAL. SE ELA FALTAR, DÁ TIMEOUT.
        res.status(201).json({ id, nome, nacionalidade });
    });
};

module.exports = { listarAutores, criarAutor };