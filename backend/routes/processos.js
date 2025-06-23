const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM dbadv.processos ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (error){
        console.error('Erro ao listar processos: ', error);
        res.status(500).json({error: 'Erro interno ao buscar os processos.'});
    }
});

module.exports = router;
