/*
Desestruturacao é a operacao pela qual se faz possível extrair
valores de vetores e objetos,atribuindo-os a variáveis avulsas
*/
// 1) DESESTRUTURACAO  DE VETOR
const carros = ['Fusca','Chevette','Opala']
// Desestruturacao
Const [c1, C2,C3] = carros

/*
   Sem a desestruturacao, seria necessario fazer
   const C1 = carros[0]
   const C2 = carros[1]
   const C3 = carros[2]
   */
  console.log({C1,C2,C3})

