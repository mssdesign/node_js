const express = require('express')
const app = express()
const port = 3000 //variável de ambiente
const path = require('path')

const basePath = path.join(__dirname, 'templates') //"__dirname" -> possui 2 underlines

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  //leitura da tabela users, resgatar um usuário do banco
  console.log(`Buscando pelo usurário: ${id}`)

  res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`)
})
