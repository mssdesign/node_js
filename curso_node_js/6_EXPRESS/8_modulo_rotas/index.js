const express = require('express');
const app = express();
const port = 3000 //variável de ambiente
const path = require('path');
const users = require('./users')

//Ler o body
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//caminho padrão (diretório inicial)
const basePath = path.join(__dirname, 'templates') //"__dirname" -> possui 2 underlines

app.use('/users', users)

//Direciona para a aba principal
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

//Escutar servidor
app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`)
})
