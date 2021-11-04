const express = require('express')
const app = express()
const port = 3000 //variável de ambiente
const path = require('path')

const basePath = path.join(__dirname, 'templates') //"__dirname" -> possui 2 underlines

const checkAuth = function(req, res, next) {

  req.authStatus = true

  if(req.authStatus) {
    console.log('Está logado, pode continuar')
    next() //Necessário para permitir a continuação da execução do programa
  } else {
    console.log('Não está logado, faça o login para continuar')
    next()
  }

}

app.use(checkAuth)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`)
})
