const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa o módulo de conexão com o banco de dados    

// ROTA PARA GET CLIENTES
router.get('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM dbadv.clientes ORDER BY id DESC`;
        const result = await db.query(sql);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro interno ao buscar clientes.' });
    }
});

// ROTA POST CLIENTES
router.post('/', async (req, res) => {
    const { nome, cpf_cnpj, email, telefone, endereco } = req.body;
    if (!nome || !cpf_cnpj) {
        return res.status(400).json({ error: 'Nome e CPF/CNPJ são obrigatórios.' });
    }
    try {
        const sql = `
        INSERT INTO dbadv.clientes (nome, cpf_cnpj, email, telefone, endereco) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *; 
        `;
        const values = [nome, cpf_cnpj, email, telefone, endereco];
        const result = await db.query(sql, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
    }
});

module.exports = router;