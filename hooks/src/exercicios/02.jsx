import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 inicialize o estado como o valor do localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(
    // Se tiver informação armazenada no localStorage, usa essa
    // informação. Senão, usa o valor de initialName
    // window.localStorage.getItem('name') ?? initialName
    
    // Usando LAZY INITIALIZER
    // Especificando uma função nos parênteses do useState,
    // em vez de um valor estático, garantimos que o valor
    // inicial da variável de estado seja ajustado apenas
    // uma única vez, durante a fase de montagem do ciclo
    // de vida do componente
    // () => initializeNameState()
    () => window.localStorage.getItem('name') ?? initialName
  )

  // function initializeNameState() {
  //   console.count('Leu localStorage')
  //   return window.localStorage.getItem('name') ?? initialName
  // }

  // Variável de estado de contagem
  const [count, setCount] = React.useState(0)

  // 🐨 Aqui é onde usamos `React.useEffect`.
  // A função deve armazenar `name` no localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
    console.count('Atualizou o localStorage')
  }, [name]) // <~ Vetor de dependências
  // Este useEffect será executado apenas quando o valor da
  // variável de estado 'name' for alterado

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        <button type="button" onClick={() => setCount(count + 1)}>Contagem: {count}</button>
      </form>
      {name ? <strong>Olá {name}</strong> : 'Por favor, informe seu nome'}
    </div>
  )
}

function Exercicio02() {
  return <Greeting />
}

export default Exercicio02