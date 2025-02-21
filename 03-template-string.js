const nome = 'Valcicleide'
const idade = 20
const cidade = 'Morro Alto de Cima'

//Mesclando strings com variaveis usando concatenação
console.log('Meu nome é: '+ nome +', tenho'+ idade + 'anos e moro em'+ cidade + '.')

//Mesclando strings e variaveis com template string
//Template strings são OBRIGATORIAMENTE delimitados por ' '
//(acentos graves/backticks)
console.log(`Meu nome é ${nome},tenho ${idade} anos e moro em ${cidade}`)

//Dentro de uma template string,não estamos limitados ausar apenas
// variáveis dentro do simbolo ${}.Qualquer código JavaScript válido
//pode ser empregado ali
console.log(`DAQUI A 7 ANOS, ${nome.toUpperCase()}TERÁ ${idade + 7} ANOS.`)