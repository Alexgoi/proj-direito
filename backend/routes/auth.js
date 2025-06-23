// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- ROTA DE REGISTRO ---
// POST /api/auth/registrar
router.post('/registrar', async (req, res) => {
  const { nome, email, senha, oab, uf_oab } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // Gera um "sal" e cria o hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const sql = `
      INSERT INTO dbadv.usuarios (nome, email, senha_hash, oab, uf_oab)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nome, email, oab, uf_oab;
    `;
    const values = [nome, email, senhaHash, oab, uf_oab];

    const result = await db.query(sql, values);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário. O email já pode estar em uso.' });
  }
});

// --- ROTA DE LOGIN ---
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    // Encontra o usuário pelo email
    const result = await db.query('SELECT * FROM dbadv.usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' }); // Usuário não encontrado
    }

    // Compara a senha enviada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' }); // Senha incorreta
    }

    // Se tudo estiver certo, cria o Token de Acesso (JWT)
    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      oab: usuario.oab,
      uf_oab: usuario.uf_oab
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;