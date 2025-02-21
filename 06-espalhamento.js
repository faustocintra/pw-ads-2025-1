//Encontrando o maior e omenor valor de uma série
let minimo = Math.min(2, -5, 8 ,4, 0, 11,-1)
let maximo = Math.min(2, -5, 8, 4,0,11, -1)

console.log({minimo,maximo})
// E se os numeros estiverem em um vetor
const nums =[2,-5,8,4,0,11,-1]
minimo = Math.min(nums) //NAO FUNCIONA
maximo = Math.max(nums) //NAO FUNCIONA

console.log({minimo,maximo}) //NaN

/* A sintaxe de espelhamento (spreading), representada por 
  ...antes do nome da variavel, é capaz de "desempacotar" um vetor 
  em uma série de valores avulsos */
  minimo = Math.min(...nums)
  maximo = Math.max(...nums)

  console.log({minimo,maximo})
  //OUTROS USOS DA SINTAXE DE ESPELHAMENTO

  const carro1 = {
    modelo:'Fiorino',
    marca: 'Fiat',
    ano: 1984,
    cor:'Bege'
  }
 //"Copiando" carro1 para carro2
// const carro2 = carro1 NAO FUNCIONA
// Forçando a cópia de um objeto usando a sintaxe de espalhamento
const carro2 = { ...carro1}

// Mudando o valor das propriedades de carro2
carro2.modelo = 'Fusca'
carro2.marca = 'Volkswagen'
carro2.cor = 'Preto'
carro2.ano = 1969

// Exibindo ambos os carros
console.log({carro1,carro2})

//Problema: Juntar dois ou mais vetores em um novo vetor

const frutas =[ 'Maçã', 'banana','Laranja','Uva']
const verduras = ['alface','couve','rucula']
//Juntando os dois vetores usando JavaScript "Clássico"(anterior a 2015)
//const hortifruti = frutas.concat(verduras)

//usando o espelahmento para unir os vetores
const hortifruti = [...frutas,verduras]

console.log({hortifruti})

//PROBLEMA : declarar uma função que recebe um número arbitrário de
//parametros
function soma(...nums) {
    //nums é recebido dentro da função como um vetor
    let resultado = 0 
    for(let n of nums) resultado += n 
    return resultado
}

console.log('Soma de 4 números:', soma(1,2,3,4,))
console.log('Soma de 7 números:', soma(10,20,30,40,50,60,70))


