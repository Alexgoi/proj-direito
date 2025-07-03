// frontend/src/pages/CalculadoraPage.jsx

import { useState } from 'react';
import '../App.css'; // Reutilizando nossos estilos

function CalculadoraPage() {
  // Estado para guardar a lista de itens.
  const [itens, setItens] = useState([{ descricao: '', quantidade: '1', valor: '', data: '' }]);
  
  // Estado para guardar os percentuais do cálculo
  const [percentuais, setPercentuais] = useState({
    multa: '2',
    juros: '1',
    honorarios: '20'
  });

  // Função para lidar com mudanças nos campos de cada item
  const handleItemChange = (index, event) => {
    // 1. Criamos uma cópia do array de itens para não modificar o estado diretamente
    const novosItens = [...itens];
    // 2. Acessamos o item específico e atualizamos a propriedade correta
    novosItens[index][event.target.name] = event.target.value;
    // 3. Atualizamos o estado com o array modificado
    setItens(novosItens);
  };

  // Função para adicionar uma nova linha de item no formulário
  const handleAddItem = () => {
    // Criamos um novo array que é o antigo + o novo item
    setItens([...itens, { descricao: '', quantidade: '1', valor: '', data: '' }]);
  };

  // Função para remover uma linha de item do formulário
  const handleRemoveItem = (index) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1); // Remove 1 item na posição 'index'
    setItens(novosItens);
  };

  const handlePercentualChange = (event) => {
    setPercentuais({ ...percentuais, [event.target.name]: event.target.value });
  };

  const handleCalcular = (event) => {
    event.preventDefault();
    alert('Lógica de cálculo a ser implementada!');
    console.log({ itens, percentuais });
  };

  return (
    <div className="container">
      <h2>Calculadora de Débitos</h2>

      <form onSubmit={handleCalcular} className="calculator-form">
        <div className="itens-header">
            <h3>Itens para Cálculo</h3>
            <span>Total de Itens: {itens.length}</span>
        </div>

        {itens.map((item, index) => (
          <div key={index} className="cota-item">
            <strong>Item {index + 1}:</strong>
            <input type="text" name="descricao" placeholder="Descrição (ex: Cota Condominial)" value={item.descricao} onChange={event => handleItemChange(index, event)} required />
            <input type="number" name="valor" placeholder="Valor Unitário (ex: 350.50)" value={item.valor} onChange={event => handleItemChange(index, event)} required />
            <input type="number" name="quantidade" placeholder="Qtde" value={item.quantidade} onChange={event => handleItemChange(index, event)} required />
            <input type="date" name="data" placeholder="Data de Vencimento" value={item.data} onChange={event => handleItemChange(index, event)} required />
            {itens.length > 1 && ( <button type="button" onClick={() => handleRemoveItem(index)} className="remove-button">Remover</button> )}
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className="add-button">
          + Adicionar Outro Item
        </button>

        <hr />
        <h3>Parâmetros do Cálculo</h3>
        <div className="parametros-grid">
          <label>Multa (%):<input type="number" name="multa" value={percentuais.multa} onChange={handlePercentualChange} /></label>
          <label>Juros ao Mês (%):<input type="number" name="juros" value={percentuais.juros} onChange={handlePercentualChange} /></label>
          <label>Honorários (%):<input type="number" name="honorarios" value={percentuais.honorarios} onChange={handlePercentualChange} /></label>
        </div>
        <hr />
        
        <button type="submit" className="login-button" style={{width: '100%', marginTop: '1rem'}}>
          Calcular Dívida
        </button>
      </form>
    </div>
  );
}

export default CalculadoraPage;