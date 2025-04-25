// Encontrando o maior e o menor valor em uma série
let minimo = Math.min(2, -5, 8, 4, 0, 11, -1)
let maximo = Math.max(2, -5, 8, 4, 0, 11, -1)

console.log({minimo, maximo})

// E se os números estiverem em um vetor?
const nums = [2, -5, 8, 4, 0, 11, -1]

minimo = Math.min(nums)   // NÃO FUNCIONA
maximo = Math.max(nums)   // NÃO FUNCIONA

console.log({minimo, maximo}) // NaN

/*
  A sintaxe de espalhamento (spreading), representada por
  ... antes do nome da variável, é capaz de "desempacotar"
  um vetor em uma série de valores avulsos
*/
minimo = Math.min(...nums)
maximo = Math.max(...nums)

console.log({minimo, maximo})

// OUTROS USOS DA SINTAXE DE ESPALHAMENTO

const carro1 = {
  modelo: 'Fiorino',
  marca: 'Fiat',
  ano: 1984,
  cor: 'bege'
}

// "Copiando" carro1 para carro2
// const carro2 = carro1  // NÃO FUNCIONA

// Forçando a cópia de um objeto usando a sintaxe de espalhamento
const carro2 = { ...carro1 }

// Mudando o valor das propriedades de carro2
carro2.modelo = 'Fusca'
carro2.marca = 'Volkswagen'
carro2.cor = 'preto'
carro2.ano = 1969

// Exibindo ambos os carros
console.log({carro1, carro2})

// PROBLEMA: juntar dois ou mais vetores em um novo vetor

const frutas = ['maçã', 'banana', 'laranja', 'uva']
const verduras = ['alface', 'couve', 'rúcula']

// Juntando os dois vetores usando JavaScript "clássico" (anterior a 2015)
//const hortifruti = frutas.concat(verduras)

// Usando o espalhamento para unir os vetores
const hortifruti = [ ...frutas, ...verduras ]

console.log({hortifruti})

// PROBLEMA: declarar uma função que recebe um número arbitrário de 
// parâmetros

function soma(...nums) {
  // nums é recebido dentro da função como um vetor
  let resultado = 0
  for(let n of nums) resultado += n
  return resultado
}

console.log('Soma de 4 números:', soma(1, 2, 3, 4))
console.log('Soma de 7 numeros:', soma(10, 20, 30, 40, 50, 60, 70))