/*
  reduce() é um método de vetores que REDUZ o vetor a um único valor.
  Para isso, aplica uma função a cada elemento do vetor, a qual
  efetua uma operação sobre o elemento e acumula o resultado a cada
  passada.
*/

const numeros = [12, 19, 3, -4, 13, -11, 15, -1, 0]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá']

// Usando reduce() para somar todos os elementos do vetor numeros
// A função de callback do reduce(), em sua forma mais simples,
// possui dois parâmetros:
// 1º ~> é o acumulador, que contém o resultado das operações sobre
//       os elementos anteriores
// 2º ~> corresponde ao elemento que está sendo processado no momento
const soma = numeros.reduce((acum, el) => acum + el)
console.log('Soma dos elementos do vetor "numeros":', soma)

const nums2 = [1, 2, 3, 4, 5, 6]

// Multiplicando os números do vetor nums2
const produto = nums2.reduce((acc, el) => acc * el)
console.log('Produto da multiplicação dos elementos de "num2":', produto)

// Concatenando o vetor de frutas em uma única string e convertendo em maiúsculas
const stringFrutas = frutas.reduce((acc, el) => acc.toUpperCase() + ';' + el.toUpperCase())
console.log('Lista de frutas:', stringFrutas)