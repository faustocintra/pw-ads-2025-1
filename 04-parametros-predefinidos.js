/*
   calcArea() é uma função que calcula a área de uma figura
   geométrica plana, dados a base, a altura e o tipo da figura
*/

// tipo é um PARAMETRO PREDEFINIDO,cujo valor default é 'R'.
// Se a função for chamada omitindo o terceiro parametro, ele
//assumirá o valor default 'R'
function calcArea(base,altura,tipo){
    switch(tipo){
      case'R': //Retangulo
        return base * altura
      case 'T': //triangulo
       return base * altura / 2
      case 'E': //eclipse/círculo
       return (base / 2) * (altura / 2) * Math.PI
      default:  //forma inválida/desconhecida
      return undefined  
    }
}

console.log(`Area triangulo 10 X 30: ${calcArea(10,30,'T')}`)
console.log(`Area eclipse(círculo) 7.5 X 7.5: ${calcArea(7.5,7.5,'E')}`)
console.log(`Area retangulo 15 X 8: ${calcArea(15,8,'R')}`)
console.log(`Area forma inválida 12 X 18: ${calcArea(12, 18,'H')}`)

//Chamada a função usando apenas dois parametros
//Como o terceiro parametro é predefinido com o valor 'R', a função
// entenderá que deve fazer o cálculo de área para um retangulo
console.log(`Area retangulo 7 X 16: ${calcArea(7, 16)}`)

/* REGRAS PARA O USO DE PARAMETROS PREDEFINIDOS
 1) O parametro predefinido deve vir sempre POR ULTIMO na lista de parametros
 2) Pode haver mais de um parametro predefido, mas eles devem ser sempre
   OS ULTIMOS na lista de parametros
*/   