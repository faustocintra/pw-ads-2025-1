import React, { useState, useEffect } from "react";

function Prova1() {
  const [preco, setPreco] = useState(0);
  const [porcentagem, setPorcentagem] = useState(0);

  // Pega do localStorage quando abre
  useEffect(() => {
    const p = localStorage.getItem("preco");
    if (p) setPreco(Number(p));

    const d = localStorage.getItem("desconto");
    if (d) setPorcentagem(Number(d));
  }, []);

  // Calcula o valor com desconto
  let total = preco - preco * (porcentagem / 100);
  if (isNaN(total)) total = 0;

  // Define o tipo de desconto
  let tipoDesconto = "";
  if (porcentagem <= 15) {
    tipoDesconto = "Negocial";
  } else if (porcentagem > 15 && porcentagem <= 50) {
    tipoDesconto = "Promocional";
  } else {
    tipoDesconto = "Liquidação";
  }

  // Salva quando muda
  useEffect(() => {
    localStorage.setItem("preco", preco);
    localStorage.setItem("desconto", porcentagem);
  });

  return (
    <main>
      <h1>Cálculo de descontos</h1>

      <div id="container">
        <div className="input-set">
          <label>
            <span>Preço cheio</span>
            <br />
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-set">
          <label>
            <span>Desconto (%)</span>
            <br />
            <input
              type="number"
              value={porcentagem}
              onChange={(e) => setPorcentagem(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="result">
          <div>Preço com desconto: {total.toFixed(2)}</div>
          <div>Classe: {tipoDesconto}</div>
        </div>
      </div>
    </main>
  );
}

export default Prova1;
