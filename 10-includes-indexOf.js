const carros = ['Chevette', 'Fusca', 'Opala', 'Maverick', 'Belina', 'Del Rey']

/*
  O método includes() testa se um determinado elemento existe em um
  vetor. Retorna true se existir, ou false, caso contrário.
  A método includes() foi incluído no JavaScript em setembro de 2016.
*/
console.log('Tem Fusca?', carros.includes('Fusca'))
console.log('Tem Corcel?', carros.includes('Corcel'))
console.log('Tem Belina?', carros.includes('Belina'))

/*
  O método indexOf() retorna o índice (posição) de um elemento no vetor.
  Caso o elemento não exista, retorna o valor -1.
*/
console.log('Posição do Maverick:', carros.indexOf('Maverick'))
console.log('Posição do Corcel:', carros.indexOf('Corcel'))
console.log('Posição do Chevette:', carros.indexOf('Chevette'))

/*
  Usando o indexOf() para testar a existência de um elemento no vetor
*/
console.log('Tem Fusca?', carros.indexOf('Fusca') >= 0)
console.log('Tem Corcel?', carros.indexOf('Corcel') >= 0)
console.log('Tem Belina?', carros.indexOf('Belina') >= 0)