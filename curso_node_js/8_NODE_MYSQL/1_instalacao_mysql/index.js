const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public')) //Ponte para arquivos estáticos

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({  //Conexão com o mysql
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql2',
})

conn.connect(function(err) {

    if(err) {
        console.log(err)
    }

    console.log('Conectou ao MySQL!')

    app.listen(3000)

})