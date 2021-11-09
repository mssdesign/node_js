const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

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

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')` //sintaxe do MySQL (deverá estar igual)

  conn.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  }) //Passando a instrução acima para o servidor MySQL
})

app.get('/books', (req, res) => {
  const sql = "SELECT * FROM books"

  conn.query(sql, function(err, data) {

    if (err) {
      console.log(err)
      return
    }

    const books = data
    
    res.render('books', { books })

  })
})

const conn = mysql.createConnection({
  //Conexão com o mysql
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql2',
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectou ao MySQL!')

  app.listen(3000)
})
