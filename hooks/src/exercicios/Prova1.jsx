import React, { useState, useEffect } from 'react';

function Prova1() {
  // Declaração lazy initializer
  const [precoCheio, setPrecoCheio] = useState(() => {
    const saved = localStorage.getItem('precoCheio');
    return saved ? Number(saved) : 0;
  });

  const [perDesc, setperDesc] = useState(() => {
    const saved = localStorage.getItem('perDesc');
    return saved ? Number(saved) : 0;
  });

  // Função única para handleChange 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numero = Number(value);

    if (name === 'preco') {
      setPrecoCheio(numero);
    } else if (name === 'desconto') {
      setperDesc(numero);
    }
  };

  // Função que calcula o preço do desconto
  const calDesconto = () => {
    const valorDesc = precoCheio * (perDesc / 100);
    return precoCheio - valorDesc;
  };

  // Estado derivado
  const precoFinal = calDesconto();

  // Função que determina a classe de desconto
  const getDesconto = () => {
    if (perDesc <= 15) {
      return 'Desconto negocial';
    } else if (perDesc > 15 && perDesc <= 50) {
      return 'Desconto promocional';
    } else {
      return 'Descoto liquidação';
    }
  };

  // Estado derivado
  const Desconto = getDesconto();

  // Efeito para salvar no localStorage quando os estados mudam
  useEffect(() => {
    localStorage.setItem('precoCheio', precoCheio);
    localStorage.setItem('perDesc', perDesc);
  }, [precoCheio, perDesc]);

  return (
    <main>
      <h1>Cálculo de Descontos</h1>

      <div id="container">
        <div className="input-set">
          <label>
            <span>Preço cheio</span><br />
            <input 
              name="preco" 
              type="number" 
              value={precoCheio} 
              onChange={handleInputChange} 
            />
          </label>
        </div>

        <div className="input-set">
          <label>
            <span>Desconto (%)</span><br />
            <input 
              name="desconto" 
              type="number" 
              value={perDesc} 
              onChange={handleInputChange} 
            />
          </label>
        </div>

        <div className="result">
          <div>Preço com desconto: {precoFinal.toFixed(2)}</div>
          <div>: {Desconto}</div>
        </div>
      </div>
    </main>
  )
}

export default Prova1;