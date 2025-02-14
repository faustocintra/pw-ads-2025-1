let media = 7.4, resultado

if(media >= 6){
    resultado = 'APROVADO'
}
else {
    resultado = 'REPROVADO'
}
console.log('Média:', media, ', situação:', resultado)

//Usando o operador ternário
resultado = media >= 6 ? 'APROVADO' : 'REPROVADO' 
console.log('Média:', media, ', situação:', resultado)

let user = 'guest', msg
/*
    Quando há apenas uma linha após um if, um while, etc.
    podemos omitir as chaves
*/
if(user === 'admin') msg = 'Bem Vindo'
else msg = 'Acesso Negado'

console.log(user, msg)

//Usando o operador ternário
msg = user === 'admin' ? 'Bem Vindo' : 'Acesso Negado'
console.log(user, msg)
