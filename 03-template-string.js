const nome = "Valcicleide"
const idade = 20
const cidade = "Morro Alto de Cima/MG"

//Mesclando strings com variáveis usando contatenação
console.log('Meu nome é ' + nome + ', tenho ' + idade + ' anos e moro em ' + cidade + '.')


//Mesclando strings e variáveis com template string
//Template strings são ONBRIGATORIAMENTE delimitados por ``
//(acentos graves/backticks)
console.log(`Meu nome é ${nome}, tenho ${idade} anos e moro em ${cidade}.`)


/* Dentro de uma template string, não estamos limitado a usar apenas 
    variáveis dentro do símbolo ${}. Qualquer código JavaScript válido
    pode ser empregado ali.
*/
console.log(`DAQUI A 7 ANOS, ${nome.toLocaleUpperCase()} TERÁ ${idade + 7} ANOS.`)