import React from 'react'

function Prova1() {

	return (<main>
		<h1>Cálculo de descontos</h1>

		<div id="container">
			<div className="input-set">
				<label>
					<span>Preço cheio</span><br />
					<input name="preco" type="number" />
				</label>
			</div>

			<div className="input-set">
				<label>
					<span>Desconto (%)</span><br />
					<input name="desconto" type="number" />
				</label>
			</div>

			<div className="result">
				<div>Preço com desconto: </div>
				<div>Classe: </div>
			</div>
		</div>
	</main>)
}



import React from 'react'

function Prova1() {
  // Nesta parte está usando um recurso chamado lazy initializer para definir o estado inicial
  // O valor inicial é obtido do localStorage, se disponível ou 0 se não estiver definido
  // Isso é útil para evitar que o valor inicial seja perdido quando o componente é renderizado novamente.
  const [preco, setPreco] = React.useState(() => {
    const valorSalvo = localStorage.getItem('preco')
    return valorSalvo ? Number(valorSalvo) : 0
  })

  const [desconto, setDesconto] = React.useState(() => {
    const valorSalvo = localStorage.getItem('desconto')
    return valorSalvo ? Number(valorSalvo) : 0
  })

  // Função genérica para lidar com mudanças em qualquer input, Extrai os dados do input que foi modificado 
  //Converte o valor digitado de string para número, já que os inputs retornam strings mesmo sendo type="number".
  function handleChange(event) {
    const { name, value } = event.target   // Extrai o nome e valor do campo
    const valorNumerico = Number(value)    // Converte valor de string para número

    if (name === 'preco') {
      setPreco(valorNumerico)
      localStorage.setItem('preco', valorNumerico)
    } else if (name === 'desconto') {
      setDesconto(valorNumerico)
      localStorage.setItem('desconto', valorNumerico)
    }
  }

  // Função que calcula o preço com desconto.
  function calcularPrecoComDesconto() {
    return preco - (preco * (desconto / 100))
  }

  // Variável derivada com o preço final
  const precoComDesconto = calcularPrecoComDesconto()

  // Função que retorna a classe de desconto
  function obterClasseDesconto() {
    if (desconto < 15) return 'Desconto negocial'
    if (desconto <= 50) return 'Desconto promocional'
    return 'Desconto de liquidação'
  }

  // Variável derivada com a classificação do desconto
  const classeDesconto = obterClasseDesconto()

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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="result">
          <div>Preço com desconto: R$ {precoComDesconto.toFixed(2)}</div>
          <div>Classe: {classeDesconto}</div>
        </div>
      </div>
    </main>
  )
}

export default Prova1
