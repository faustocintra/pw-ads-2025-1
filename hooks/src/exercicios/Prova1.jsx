import React, {useState, useEffect} from 'react'

function Prova1() {
 // Declaração das variáveis de estado para os inputs, inicializadas Zero(0)
 // Usando lazy initializer para ler do localStorage (NÃO SEI SE ESTA CORRETO O CÓDIGO)
  const [preco, setPreco] = useState(() => {
    const saved = window.localStorage.getItem('preco');
    return saved !== null ? Number(saved) : 0;
  });
  
  const [desconto, setDesconto] = useState(() => {
    const saved = window.localStorage.getItem('desconto');
    return saved !== null ? Number(saved) : 0;
  });

  //Função para manipular os eventos onChange de ambos os inputs.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    
    if (name === 'preco') {
      setPreco(numericValue);
    } else if (name === 'desconto') {
      setDesconto(numericValue);
    }
  };

  //Função que calcula o preço com desconto
  const calcularPrecoComDesconto = () => {
    if (desconto <= 0) return preco;
    if (desconto >= 100) return 0;
    return preco * (1 - desconto / 100);
  };
  
  //Esta variável é a de Estado derivado: preço com desconto
  const precoComDesconto = calcularPrecoComDesconto();

  //Função que determina a classe de desconto que vai de 15%(desconto necociaável), 
  //de 15,1% a 50%(desconto promocional) e acima de 50%(desconto de liquidação)
  const determinarClasseDesconto = () => {
    if (desconto <= 15) return 'Desconto negocial';
    if (desconto <= 50) return 'Desconto promocional';
    return 'Desconto de liquidação';
  };
  
  //Declarei a função de Estado derivado: classe de desconto
  const classeDesconto = determinarClasseDesconto();

  //Não sei se fiz certo mas este é para Mecanismo de salvar os valores no localStorage
  useEffect(() => {
    window.localStorage.setItem('preco', preco.toString());
    window.localStorage.setItem('desconto', desconto.toString());
  }, [preco, desconto]);

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
              value={desconto} 
              onChange={handleInputChange} 
            />
          </label>
        </div>

        <div className="result">
          {/* Estou exibindo os valores das variáveis de estado */}
          <div>Preço com desconto: {precoComDesconto.toFixed(2)}</div>
          <div>Classe: {classeDesconto}</div>
        </div>
        <div>Obrigado Professor, muito agradecido!!!</div>
      </div>
    </main>
  )
}

export default Prova1