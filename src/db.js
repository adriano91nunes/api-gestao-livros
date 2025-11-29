const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Garante que o arquivo do banco fique na pasta raiz do projeto
const dbPath = path.resolve(__dirname, '../banco-de-dados.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

db.serialize(() => {
    // Tabela Autores
    db.run(`
        CREATE TABLE IF NOT EXISTS autores (
            id TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            nacionalidade TEXT NOT NULL
        )
    `);

    // Tabela Livros
    db.run(`
        CREATE TABLE IF NOT EXISTS livros (
            id TEXT PRIMARY KEY,
            titulo TEXT NOT NULL,
            ano_publicacao INTEGER,
            genero TEXT,
            num_paginas INTEGER,
            autor_id TEXT,
            FOREIGN KEY (autor_id) REFERENCES autores (id)
        )
    `);
    
    // Tabela Usuarios
     db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id TEXT PRIMARY KEY,
            nome_completo TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    `);

     // Tabela Leituras
     db.run(`
        CREATE TABLE IF NOT EXISTS leituras (
            id TEXT PRIMARY KEY,
            usuario_id TEXT,
            livro_id TEXT,
            status TEXT,
            avaliacao INTEGER,
            FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
            FOREIGN KEY (livro_id) REFERENCES livros (id)
        )
    `);
});

module.exports = db;