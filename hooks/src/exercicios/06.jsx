import * as React from 'react'
// 🐨 você vai precisar dos seguintes itens de '../pokemon':
// fetchPokemon: a função que retorna as informações do pokémon
// PokemonInfoFallback: o que é exibido enquanto as informações do pokémon
// são carregadas
// PokemonDataView: o componente usado para exibir as informações do pokémon
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 crie o estado para o pokémon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('IDLE')

  // Uma única variável de estado de objeto para substituir as três
  // variáveis de estado "avulsas" anteriores
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'IDLE'
  })

  // Para diminuir a quantidade de alterações necessárias no código
  // já existente, podemos desestruturar a variável de estado "state"
  // em variáveis individuais somente leitura
  const {
    pokemon,
    error,
    status
  } = state

  React.useEffect(() => {
    console.count('Componente atualizado')
  })

  // 🐨 crie React.useEffect de modo a ser chamado sempre que pokemonName mudar.
  // 💰 NÃO SE ESQUEÇA DO VETOR DE DEPENDÊNCIAS!
  React.useEffect(() => {
    // 💰 se pokemonName é falso (ou uma string vazia) não se preocupe em fazer 
    // a requisição (retorne precocemente).
    if(! pokemonName) return    // Early return (retorno precoce)

    // 🐨 antes de chamar `fetchPokemon`, limpe o estado atual do pokemon
    // ajustando-o para null.
    // (Isso é para habilitar o estado de carregamento ao alternar entre diferentes
    // pokémon.)
    // setPokemon(null)
    // setError(null)
    // setStatus('IDLE')
    setState({ pokemon: null, error: null, status: 'PENDING' })

    // 💰 Use a função `fetchPokemon` para buscar um pokémon pelo seu nome:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* atualize todos os estados aqui */},
    //   )
    // setStatus('PENDING')
    fetchPokemon(pokemonName)
      .then(    // requisição bem-sucedida
        pokemonData => {
          // setPokemon(pokemonData)
          // setStatus('RESOLVED')
          // ...state tira uma cópia da variável de estado com seus valores
          // correntes antes de atualizar apenas os campos "pokemon" e "status"
          setState({ ...state, pokemon: pokemonData, status: 'RESOLVED' })
        }
      )
      .catch(   // requisições com falha
        error => {
          // setError(error)
          // setStatus('ERROR')
          // "error" é uma propriedade abreviada (equivalente a "error: error")
          setState({ ...state, error, status: 'ERROR' })
        }
      )
  }, [pokemonName])

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  // 🐨 retorne o seguinte baseado nos estados `pokemon` e `pokemonName`:
  //   1. não há pokemonName: 'Informe um pokémon'
  //   2. tem pokemonName mas não pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. tem pokemon: <PokemonDataView pokemon={pokemon} />
  // if(error) return <div role="alert">
  //     Erro encontrado: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
  //   </div>
  // if(! pokemonName) return 'Informe um pokémon'
  // if(pokemonName && !pokemon) return <PokemonInfoFallback name={pokemonName} />
  // if(pokemon) return <PokemonDataView pokemon={pokemon} />
  
  switch(status) {
    case 'IDLE':        // Ocioso, aguardando entrada
      return 'Informe um pokémon'
    case 'PENDING':     // Requisição enviada, aguardando resultado
      return <PokemonInfoFallback name={pokemonName} />
    case 'RESOLVED':    // Requisição resolvida com sucesso
      return <PokemonDataView pokemon={pokemon} />
    default:            // ERROR, requisição falhou
      return <div role="alert">
        Erro encontrado: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
  }
  
}

function Exercicio06() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default Exercicio06