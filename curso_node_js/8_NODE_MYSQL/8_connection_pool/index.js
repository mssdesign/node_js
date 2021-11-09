const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

//ESTA VERSÃO DO APP UTILIZA QUERY's PARA CARREGAR MAIS RÁPIDO POR MEIO DO CONNECTION POOL E TAMBÉM GERENCIANDO AS CONEXÕES LIMITES PARA O SISTEMA DISPENSAR AS CONEXÕES QUE NÃO SERÃO MAIS UTILIZADAS

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

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')` //sintaxe do MySQL (deverá estar igual) ATENÇÃO ÀS ASPAS SIMPLES EM TORNO DAS VARIÁVEIS

  pool.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  }) //Passando a instrução acima para o servidor MySQL
})

app.get('/books', (req, res) => {
  const sql = "SELECT * FROM books"

  pool.query(sql, function(err, data) {

    if (err) {
      console.log(err)
      return
    }

    const books = data
    
    res.render('books', { books })

  })
})

app.get('/books/:id', (req, res) => {

  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`

  pool.query(sql, function(err, data) {

    if (err) {
      console.log(err)
      return
    }

    const book = data[0]

    res.render('book', { book })

  })

})

app.get('/books/edit/:id', (req, res) => {  //Pegando dados para edição

  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}` //Não precisa de aspas no ID é facultativo

  pool.query(sql, function(err, data) {

    if (err) {
      console.log(err)
      return
    }

    const book = data[0]

    res.render('editbook', { book })

  })

})

app.post('/books/updatebook', (req, res) => {

  const id = req.body.id
  const title = req.body.title  //esses dados vêm do name do html
  const pageqty = req.body.pageqty

  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

  pool.query(sql, function(err) {

    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')

  })

})

app.post('/books/remove/:id', (req, res) => {

  const id = req.params.id    //Pegar dados do URL

  const sql = `DELETE FROM books WHERE id = ${id}`

  pool.query(sql, function(err) {

    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')

  })

})

app.listen(3000)

////Os comandos abaixo não são mais necessários quando se usa connection pool
// const conn = mysql.createConnection({
//   //Conexão com o mysql
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'nodemysql2',
// })

// conn.connect(function (err) {
//   if (err) {
//     console.log(err)
//   }

//   console.log('Conectou ao MySQL!')

//   app.listen(3000)
// })
