/*
  O método de vetores map() cria um novo vetor em que cada elemento
  corresponde a uma transformação do elemento do vetor original.
  O novo vetor gerado por map() terá sempre o mesmo tamanho do vetor
  original.
*/

const numeros = [12, 19, 3, -4, 13, -11, 15, -1, 0]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá']

// Gerando um novo vetor em que o valor de cada elemento é o dobro
// do valor do elemento do vetor original
const dobros = numeros.map(n => n * 2)
console.log('Vetor original:  ', numeros)
console.log('Vetor com dobros:', dobros)

// map() que transforma os elementos do vetor original em itens de lista
// para uso em uma página HTML (aplicação frequente em React)
const itensLista = frutas.map(fruta => `<li>${fruta}</li>`)
console.log('Vetor com itens da lista:', itensLista)

console.log('<h1>FRUTAS ENCONTRADAS NO BRASIL</h1>')
console.log('<ul>')
for(let item of itensLista) console.log(item)
console.log('</ul>')