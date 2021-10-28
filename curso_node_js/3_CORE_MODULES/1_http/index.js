const http = require('http');

const port = 3000;      //Definindo porta

const server = http.createServer((req, res) => {

    res.write('Oi HTTP')        //Enviando dados
    res.end()       //Finalizando envio

})

server.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})