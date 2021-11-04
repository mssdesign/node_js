const express = require('express')
const app = express()
const port = 3000 //variável de ambiente
const path = require('path')

//Ler o body
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//caminho padrão (diretório inicial)
const basePath = path.join(__dirname, 'templates') //"__dirname" -> possui 2 underlines

//Visualizando o formulário
app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

//Pegando dados do input e visualizando no terminal
app.post('/users/save', (req, res) => {
  console.log(req.body) //Exemplo de output aqui: { name: 'teste', age: '50' }

  const name = req.body.name
  const age = req.body.age

  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)

  res.sendFile(`${basePath}/userform.html`) //Redireciona para a página formulário novamente
})

//Buscando por usuário teste
app.get('/users/:id', (req, res) => {
  const id = req.params.id

  //leitura da tabela users, resgatar um usuário do banco
  console.log(`Buscando pelo usurário: ${id}`)

  res.sendFile(`${basePath}/users.html`)
})

//Direciona para a aba principal
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

//Escutar servidor
app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`)
})
