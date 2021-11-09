const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,                //Permite até 10 conexões até começar a gerenciar
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql2',
})

module.exports = pool;