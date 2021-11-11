const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const app = express()

//ATENÇÃO OCORREU UM ERRO AO INICIAR ESSE APP PARA RESOLVER FOI INSTALADO O mysql2 a partir do comando npm install mysql2

app.use(
  //Utilizando middleware para pegar dados do url
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json()) //Transformando dados do url em json

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public')) //Ponte para arquivos estáticos

app.get('/', (req, res) => {
  res.render('home')
})


app.listen(3000)