import React, { useState } from 'react';

function Prova1() {
  
  // recupera os valores no localStorage ou inicia com 0
  const [preco, setPreco] = useState(() => {
    return Number(localStorage.getItem("preco")) || 0;
  });
  const [desconto, setDesconto] = useState(() => {
    return Number(localStorage.getItem("desconto")) || 0;
  });
  
  // função para manipular os inputs
  const onChange = (evento) => {
    const { name, value } = evento.target;

    if (name === "preco") {
      setPreco(value);
      localStorage.setItem("preco", value);
    } else if (name === "desconto") {
      setDesconto(value);
      localStorage.setItem("desconto", value);
    }
  };

  // função para calcular o preço com desconto
  const calcularPrecoComDesconto = () => {
    return preco * (1 - desconto / 100);
  };

  // variavel que puxa a função calcular preço e recebe o preço com o desconto
  const precoComDesconto = calcularPrecoComDesconto()

  // função que determina a classe do desconto
  const determinaClasseDesconto = () => {
    if (desconto <= 15) {
      return "Desconto Negocial";
    } else if (desconto > 15 && desconto <= 50) {
      return "Desconto Promocional";
    } else {
      return "Desconto de Liquidação";
    }
  };

  // variavel que recebe o return da classe correta
  const classeDesconto = determinaClasseDesconto()



  return (
    <main>
      <h1>Cálculo de descontos</h1>

      <div id="container">
        <div className="input-set">
          <label>
            <span>Preço cheio</span><br />
            <input 
              name="preco" 
              type="number" 
              value={preco} 
              onChange={(e) => setPreco(e.target.value)} 
            />
          </label>
        </div>

        <div className="input-set">
          <label>
            <span>Desconto (%)</span><br />
            <input 
              name="desconto" 
              type="number" 
              value={desconto} 
              onChange={(e) => setDesconto(e.target.value)} 
            />
          </label>
        </div>     
          {/* div resultado mostrando os resultados */}
          <div classnome="result">s
            <div>Preço com desconto: <strong>{precoComDesconto.toFixed(2)}</strong></div> 
            <div>Classe do desconto: <strong>{classeDesconto}</strong></div>
          </div>
      </div>
    </main>
  );
}

export default Prova1;
