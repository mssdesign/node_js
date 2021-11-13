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

app.get('/users/create', (req, res) => {
  res.render('adduse')
})

app.post('/users/create', async (req, res) => {

  //Os dados abaixo são apenas didático. É preciso tratar os dados em uma aplicação real por motivo de segurança
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if(newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false      //Necessário para a variável não ficar nula
  }

  console.log(req.body)

  await User.create({name, occupation, newsletter})   //Com isso é possível criar as querys no bando de dados automaticamente com o sequelize

  res.redirect('/')

})

app.get('/', (req, res) => {
  res.render('home')
})

conn.sync().then(() => {    //A aplicação só vai funcionar quando as tabelas necessárias forem criadas
  app.listen(3000)
}).catch((err) => console.log(err))