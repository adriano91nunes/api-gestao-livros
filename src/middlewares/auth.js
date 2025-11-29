const jwt = require('jsonwebtoken');
const SECRET_KEY = 'minha-chave-secreta-super-dificil'; // Tem que ser a mesma do controller

const verificarToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];

    // O token geralmente vem assim: "Bearer eyJhbGciOi..."
    if (!tokenHeader) {
        return res.status(403).json({ error: 'Token não fornecido! Tá de palha assada my friend?' });
    }

    // Remove a palavra "Bearer " se ela existir, pegando só o código
    const token = tokenHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'Formato de token inválido! Queres que eu digite para você também?' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado! Tá de brincation with me?' });
        }
        
        // Salva o ID do usuário na requisição para usarmos depois
        req.usuarioId = decoded.id;
        next(); // Pode passar!
    });
};

module.exports = verificarToken;