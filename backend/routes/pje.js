// backend/routes/pje.js
console.log('--- EXECUTANDO O ARQUIVO NOVO DO PJE.JS');

const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');

router.get('/sincronizar', verifyToken, async (req, res) => {
  const {nome} = req.user;
  if(!nome){
    return res.status(400).json({error: 'Usuário não possui OAB/UF cadastrados para a sincronização'});
  }
  console.log(`Requisio de sincronização recebida para o usuário: ${req.user.nome}  ${req.user.oab}`);
  
  try{
    let todosOsItens = [];
    let paginaAtual = 1;
    let aindaHaPaginas = true;
    const itensPorPagina = 100;

    do{
      console.log(`Buscando página ${paginaAtual}...`);
      const response = await axios.get(process.env.PJE_API_URL,{
        params: {
          nomeAdvogado: nome,
          pagina: paginaAtual,
          itensPorPagina: itensPorPagina,

          dataDisponibilizacaoInicio: '2010-01-01',
          dataDisponibilizacaoFim: '2099-12-31'
        }
      });

      const dadosDaPagina = response.data;
      if(!dadosDaPagina || !dadosDaPagina.items){
        throw new Error('Resposta da API do PJe em formato inesperado.');
      }

      const itensRecebidos = dadosDaPagina.items;
      if (itensRecebidos.length > 0) {
        todosOsItens.push(...itensRecebidos);
        if(itensRecebidos.length < itensPorPagina){
          aindaHaPaginas = false;
        }else {
          paginaAtual++;
        }
      } else{
        aindaHaPaginas = false;
      }
    } while (aindaHaPaginas);
    console.log(`Busca na API concluida. Total de ${todosOsItens.length} itens encontrados. Procesando e salvando no banco...`);
  
    let processosNovos = 0;
    let processosAtualizados = 0;

    for(const item of todosOsItens){
      const numeroProcesso = item.numero_processo;
      if(!numeroProcesso) continue;

      const autores = item.destinatarios.filter(d => d.polo === 'A').map(d => d.nome).join(' & ');
      const reus = item.destinatarios.filter(d => d.polo === 'P').map(d => d.nome).join(' & ');
      const dataMovimento = item.data_disponibilizacao;

      const processoExistente = await db.query(
        'SELECT id FROM dbadv.processos WHERE numero_processo_cnj = $1',
        [numeroProcesso]
      );

      if (processoExistente.rows.length > 0){
        await db.query(
          `UPDATE dbadv.processos SET parte_autora = $1, parte_re = $2, data_ultimo_movimento = $3, titulo = $4 WHERE numero_processo_cnj = $5`,
          [autores || 'Autor não identifado', reus || 'Réu não identificado', dataMovimento, item.nomeClasse, numeroProcesso]

        );
        processosAtualizados++;
      } else{
        await db.query(
          `INSERT INTO dbadv.processos (numero_processo_cnj, titulo, data_inicio, parte_autora, parte_re, data_ultimo_movimento) VALUES ($1, $2, $3, $4, $5, $6)`,
          [numeroProcesso, item.nomeClasse, dataMovimento, autores || 'Autor não identificado', reus || 'Réu não identificado', dataMovimento]

        );
        processosNovos++;
      }
    } 
    res.status(200).json({
      message: `Sincronização concluída! Total de ${todosOsItens.length} itens processados`,
      processosNovosAdicionados: processosNovos,
      processosAtualizados: processosAtualizados,
    });
  } catch (error){
    console.error("Erro durante a sincronização paginada: ", error.response?.data || error.message);
    res.status(500).json({error: 'Falha na sincronização paginada com o Pje.'})
  }
});


module.exports = router;