const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')   //Não é preciso utilizar para criar a tabela tendo o caminho do arquivo aqui o sequelize entende e mapeia ele criando a tabela ao iniciar a aplicação

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

conn.sync().then(() => {    //A aplicação só vai funcionar quando as tabelas necessárias forem criadas
  app.listen(3000)
}).catch((err) => console.log(err))