require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa o módulo de conexão com o banco de dados     

const app= express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());    

// ROTA DE TESTE
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

//DEFINIÇÃO DAS ROTAS
const clienteRoutes = require('./routes/clientes');
const pjeRoutes = require('./routes/pje');
const processoRoutes = require('./routes/processos');
const authRotes = require('./routes/auth');

// USO DAS ROTAS
app.use('/api/clientes', clienteRoutes);
app.use('/api/pje', pjeRoutes);
app.use('/api/processos', processoRoutes);
app.use('/api/auth', authRotes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});