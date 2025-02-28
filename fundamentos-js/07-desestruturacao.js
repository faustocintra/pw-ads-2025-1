/*
  Desestruturação é a operação pela qual se faz possível extrair
  valores de vetores e objetos, atribuindo-os a variáveis avulsas
*/

// 1) DESESTRUTURAÇÃO DE VETOR
const carros = ['Fusca', 'Chevette', 'Opala']

// Desestruturação
const [c1, c2, c3] = carros

/*
  Sem a desestruturação, seria necessário fazer
  const c1 = carros[0]
  const c2 = carros[1]
  const c3 = carros[2]
*/

console.log({c1, c2, c3})

// Desestruturação parcial: 1º e 2º valores
const [x, y] = carros
console.log('Primeiro e segundo carros:', {x, y})

// Desestruturação parcial: 1º e 3º valores
const [a, , b] = carros
console.log('Primeiro e terceiro carros:', {a, b})

// Desestruturação parcial: 2º e 3º valores
const [, j, k] = carros
console.log('Segundo e terceiro carros:', {j, k})

// PROBLEMA: troca de valores de variáveis entre si (swap)

let v1 = 10, v2 = 20
console.log({v1, v2})

// Modo clássico de fazer swap (usando variável auxiliar)
//let temp = v1
//v1 = v2
//v2 = temp

// Usando desestruturação para fazer swap (dispensa variável
// auxiliar)
{ [v1, v2] = [v2, v1] }

console.log('Valores trocados:', {v1, v2})

/****************************************************************/

// Traço separador
console.log('-'.repeat(80))

// 2) DESESTRUTURAÇÃO DE OBJETOS

const pessoa = {
  nome: 'Orkutilson Orozimbo Osório',
  sexo: 'M',
  dataNasc: '2010-04-29',
  email: 'orkutilson@gmail.com'
}

/*
  Na desestruturação de objeto, as variáveis avulsas:
  ~> DEVEM ter o MESMO NOME das propriedades do objeto
  ~> Podem ser especificadas em qualquer ordem
  ~> Pode ser feita a desestruturação parcial
*/
const { sexo, nome, email } = pessoa

console.log({ nome, sexo, email })