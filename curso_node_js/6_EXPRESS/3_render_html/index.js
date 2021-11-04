const express = require('express')
const app = express()
const port = 3000 //variável de ambiente
const path = require('path')

const basePath = path.join(__dirname, 'templates') //"__dirname" -> possui 2 underlines

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`)
})
