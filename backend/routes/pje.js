// backend/routes/pje.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');

router.get('/sincronizar', async (req, res) => {
  console.log('Recebida requisição para sincronizar com PJe...');
  let itemsDaApi;
  try {
    const nomeAdvogado = 'Tatiana Lima da Silva';
    const response = await axios.get(process.env.PJE_API_URL, {
      params: { homeAdvogado: nomeAdvogado }
    });
    itemsDaApi = response.data.items;
    console.log(`${itemsDaApi.length} comunicações recebidas do PJe.`);
  } catch (apiError) {
    console.error("Erro ao chamar a API do PJe:", apiError.message);
    return res.status(500).json({ error: 'Falha ao se comunicar com o serviço do PJe.' });
  }

  try {
    let processosNovos = 0;
    let processosAtualizados = 0;

    for (const item of itemsDaApi) {
      const numeroProcesso = item.numero_processo;
      if (!numeroProcesso) continue;

      const autores = item.destinatarios.filter(d => d.polo === 'A').map(d => d.nome).join(' & ');
      const reus = item.destinatarios.filter(d => d.polo === 'P').map(d => d.nome).join(' & ');
      const dataMovimento = item.data_disponibilizacao;

      const processoExistente = await db.query(
        'SELECT id FROM dbadv.processos WHERE numero_processo_cnj = $1',
        [numeroProcesso]
      );

      if (processoExistente.rows.length > 0) {
        // Se o processo já existe, ATUALIZAMOS com as novas informações
        await db.query(
          `UPDATE dbadv.processos 
           SET parte_autora = $1, parte_re = $2, data_ultimo_movimento = $3
           WHERE numero_processo_cnj = $4`,
          [
            autores || 'Autor não identificado', 
            reus || 'Réu não identificado',
            dataMovimento,
            numeroProcesso
          ]
        );
        processosAtualizados++;
      } else {
        // Se não existe, INSERIMOS
        await db.query(
          `INSERT INTO dbadv.processos (numero_processo_cnj, titulo, data_inicio, parte_autora, parte_re, data_ultimo_movimento)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            numeroProcesso, 
            item.nomeClasse, 
            dataMovimento,
            autores || 'Autor não identificado',
            reus || 'Réu não identificado',
            dataMovimento
          ]
        );
        processosNovos++;
      }
    }

    res.status(200).json({
      message: 'Sincronização concluída com sucesso!',
      totalItemsRecebidos: itemsDaApi.length,
      processosNovosAdicionados: processosNovos,
      processosAtualizados: processosAtualizados,
    });

  } catch (dbError) {
    console.error("Erro ao salvar dados no banco:", dbError);
    res.status(500).json({ error: 'Falha ao processar ou salvar dados do PJe' });
  }
});

module.exports = router;