let media = 7.4, resultado

if(media >= 6) {
  resultado = 'APROVADO'
}
else {
  resultado = 'Reprovado'
}
console.log('Média:', media, ', situação:', resultado)

// Usando o operador ternário
resultado = media >= 6 ? 'APROVADO' : 'Reprovado'

console.log('Média:', media, ', situação:', resultado)

let user = 'guest', msg
/*
  Quando há apenas uma linha após um if, um while, etc.
  podemos omitir as chaves
*/
if(user === 'admin') msg = 'Bem-vindo!'
else msg = 'Acesso negado'

console.log(user, msg)

// Usando o operador ternário
msg = user === 'admin' ? 'Bem-vindo!' : 'Acesso negado'

console.log(user, msg)