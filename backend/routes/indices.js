const express = require('express');
const router = express.Router();
const axios = require('axios');

const formataDataParaBCB = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
};

router.get('/igpm', async(req, res) =>{
    let dataInicial, dataFinal;

    if(req.query.dataInicial && req.query.dataFinal){
        dataInicial = req.query.dataInicial;
        dataFinal = req.query.dataFinal;
    } else {
        const hoje = new Date();
        const doisAnosAtras = new Date();
        doisAnosAtras.setFullYear(hoje.getFullYear()- 2);

        dataFinal = formataDataParaBCB(hoje);
        dataInicial = formataDataParaBCB(doisAnosAtras);
    }

    const codigoSerie = 189;
    const urlApiBCB = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigoSerie}/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;

    try {
        console.log(`Buscando dados do IGP-M no Banco Central: ${urlApiBCB}`);
        const response = await axios.get(urlApiBCB);

        const dadosFormatados = response.data.map(item => {
            const partesData = item.data.split('/');
            const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
            return {
                data: dataFormatada,
                fator: 1 + (parseFloat(item.valor) / 100)
            }
        });

        res.status(200).json(dadosFormatados);
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Falha ao buscar dados de índice econômico do BCB.';
        console.error(`Erro ${status} ao buscar dados no BCB: `, message);
        res.status(status).json({error: message});
    }
        
});

module.exports = router;