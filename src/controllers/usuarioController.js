const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs'); // Para criptografar senha
const jwt = require('jsonwebtoken'); // Para criar o token

const SECRET_KEY = 'minha-chave-secreta-super-dificil'; // Em produção, isso ficaria num arquivo .env

// 1. REGISTRAR USUÁRIO
const registrarUsuario = (req, res) => {
    const { nomeCompleto, email, senha } = req.body;

    if (!nomeCompleto || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Criptografa a senha (embaralha ela)
    const senhaHash = bcrypt.hashSync(senha, 10);
    const id = uuidv4();

    const sql = `INSERT INTO usuarios (id, nome_completo, email, senha) VALUES (?, ?, ?, ?)`;

    db.run(sql, [id, nomeCompleto, email, senhaHash], function(err) {
        if (err) {
            // Se der erro, provavelmente o email já existe (definimos UNIQUE no banco)
            return res.status(500).json({ error: 'Erro ao cadastrar. Verifique se o e-mail já existe.' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id });
    });
};

// 2. LOGIN (AUTENTICAÇÃO)
const login = (req, res) => {
    const { email, senha } = req.body;

    // Busca o usuário pelo email
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, usuario) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (!usuario) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }

        // Compara a senha que ele digitou com a senha embaralhada no banco
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }

        // Se deu tudo certo, gera o TOKEN (o crachá)
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, 
            SECRET_KEY, 
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({ message: 'Login realizado!', token });
    });
};

module.exports = { registrarUsuario, login };