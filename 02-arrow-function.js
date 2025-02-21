let media = 7.4, resultado

if(media >= 6) {
    resultado = 'APROVADO'
}
else {
resultado = 'REPROVADO'
}
console.log ('Média: ',media, ',situação:', resultado)

//usando o operador ternário
resultado = media >=6 ? 'APROVADO' : 'REPROVADO '
// testa se for a primeira opção dá o resultado(:senão) senão é a segunda opção
console.log('Média:', media,' situação: ', resultado)

/*
   Quando há apenas uma linha após um if, um while, etc.
   podemos omitir as chaves 
*/
if(user ==='admin')msg ='Bem-Vindo! '
else msg = 'Acesso Negado'

console.log(user,msg)

//usando o operador ternário 
msg = user === 'Admin' ? 'Bem-Vindo!' : 'Acesso Negado'

console.log(user,msg)

/*git add.
  git commit -m "(14/02) Arrow function e operador ternário"
  git push
*/  
//Pra guardar o arquivo