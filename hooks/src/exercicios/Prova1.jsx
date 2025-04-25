import React from 'react'

// inicio do codigo
function Prova1() {
  // declarando duas variaveis input com local storage
  const [preco, setPreco] = React.useState(() => {
    () => window.localStorage.getItem('preco') ?? preco
  })

  const [desconto, setDesconto] = React.useState(() => {
    () => window.localStorage.getItem('desconto') ?? desconto
  })

  //local storage para salvar os valores quando a pagina fechar
  React.useEffect(() => {
    window.localStorage.setItem('preco', preco)
    console.count('Atualizou o localStorage')
  }, [preco])

  React.useEffect(() => {
    window.localStorage.setItem('desconto', desconto)
    console.count('Atualizou o localStorage')
  }, [desconto])

  // manipulando eventos onchange de ambos os input
  // atualizando os valores das variaveis
  function handlePrecoChange(event) {
    setPreco(Number(event.target.value))
  }

  function handleDescontoChange(event) {
    setDesconto(Number(event.target.value))
  }

  // declarando uma funcao que retorna o valor do preco com desconto
  function calcularPrecoDesconto() {
    return (preco - valorDesconto).toFixed(2)
  }

  // uma variavel comum que recebe o valor e retorna-o
  const valorDesconto = calcularPrecoDesconto(preco, desconto)

  // uma função que determina e retorna a classe de desconto
  function getClasseDesconto() {
    if (desconto <= 15) {
      return "Desconto negocial"
    } 
    else if (desconto > 15 && desconto <= 50) {
      return "Desconto promocional"
    } 
    else if (desconto > 50) {
      return "Desconto de liquidação"
    } 
    else {
      return "Desconto inválido"
    }
  }
  // outra função comum que recebe e retorna os valores mais dessa vez para classeDesconto
  const classeDesconto = getClasseDesconto(desconto)

  return (
    // mudando os valores antigos pelos que eu coloquei nas funções lá em cima
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
              onChange={handlePrecoChange}
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
              onChange={handleDescontoChange}
            />
          </label>
        </div>

        <div className="result">
          <div>Preço com desconto: R$ {calcularPrecoDesconto()}</div>
          <div>Classe: {classeDesconto()}</div>
        </div>
      </div>
    </main>
  )
}

export default Prova1
