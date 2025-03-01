// Alguns dados de um usuário
const fullname = 'Jonicleisson Junqueira Júnior'
const username = 'junin'
const group = 'alunos'

/* CRIANDO UM OBJETO A PARTIR DAS VARIÁVEIS ACIMA */
const user1 = {
  fullname: fullname,
  username: username,
  group: group
}
console.log(user1)

/* Quando o nome das propriedades é idêntico ao das variáveis
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
  lastLogin: '2025-02-20 12:23:37'
}
console.log(user3)

/* DEPURAÇÃO USANDO PROPRIEDADES ABREVIADAS */

const x = 10, y = 'batata'

/* Exibindo o valor das duas variáveis com console.log().
   Observe que os valores são mostrados, mas a saída não
   informa quais as variáveis de onde provêm os valores
*/
console.log(x, y)

/* Saída melhorada: passando um objeto formado pelas variáveis
   como propriedades abreviadas para o console.log(), conseguimos
   saber de onde vêm os valores
*/
console.log({x, y}) 