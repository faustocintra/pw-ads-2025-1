/*
  O método de vetores filter() cria um NOVO VETOR contendo apenas os
  elementos que atendam ao critério representado pela função passada
  como parâmetro
*/

const numeros = [12, 19, 3, -4, 13, -11, 15, -1, 0]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá']

// Criando um novo vetor apenas com os números negativos
const negativos = numeros.filter(n => n < 0)
console.log('Apenas números negativos:', negativos)

// Criando um novo vetor contendo apenas números pares
const pares = numeros.filter(i => i % 2 === 0)
console.log('Apenas números pares:', pares)

// Criando um novo vetor contendo apenas números maiores que 20
const maiores20 = numeros.filter(x => x > 20)
console.log('Apenas números > 20:', maiores20)

// Novo vetor apenas com frutas que começam com a letra "m"
const mInicial = frutas.filter(el => el.charAt(0) === 'm')
console.log('Apenas frutas com inicial "m":', mInicial)

// Novo vetor apenas com frutas que terminam com a letra "i"
const iFinal = frutas.filter(f => f.slice(-1) === 'i')
console.log('Apenas frutas com final "i":', iFinal)

// Novo vetor apenas com frutas que terminal com a letra "r"
const rFinal = frutas.filter(x => x.slice(-1) === 'r')
console.log('Apenas frutas com final "r":', rFinal)