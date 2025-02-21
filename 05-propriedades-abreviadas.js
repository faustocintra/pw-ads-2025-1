//alguns dados de um usuário
const fullname = 'Jonicleison Junqueira Júnior'
const username = 'Junin'
const group    = 'alunos'

/*CRIANDO UM OBJETO A PARTIR DAS VARIAVEIS ACIMA */
const user1 = {
    fullname: fullname,
    username: username,
    group   : group
}

console.log(user1)

/* Quando o nome das propriedades é identico ao das variáveis
   que lhes darão os valores, é possível usar a sintaxe chamada
   PROPRIEDADES ABREVIADAS, pela qual não é necessário repetir
   os nomes das variáveis à frente do nome das propriedades */

 const user2 = {
    fullname,
    username,
    group
 }  
 console.log(user2)

 // Um objeto pode mesclar propriedades abreviadas e não abreviadas
 const user3 = {
    fullname,
    username,
    password: 'TodoPoderosoTimao',
    group,
    lastlogin: '2025-02-20 12:23:37'
 }
 console.log(user3)

 /* DEPURACAO USANDO PROPRIEDADES ABREVIADAS */
  const x = 10, y = 'batata'

  /*Exibindo o valor das duas variaveis com console.log().
    Observe que os valores são mostrados,mas a saída não
    informa quais as variaveis de onde provem os valores
    */
   console.log(x,y)
   /* Saída melhorada: passando um objeto formado pelas variaveis
      como propriedades abreviadas para o console.log(), conseguimos
      saber de onde vem os valores
   */
  console.log(x, y)
  
  
