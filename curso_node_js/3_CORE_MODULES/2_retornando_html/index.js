const http = require('http');

const port = 3000;      //Definindo porta

const server = http.createServer((req, res) => {

    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')
    res.end('<h1>Olá, eu sou o mundo e eu odeio "olá, mundos"!<h1><p>Testando att</p>')

})

server.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})