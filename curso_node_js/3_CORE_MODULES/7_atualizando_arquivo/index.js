//Gerando um arquivo e escrevendo nele através de um input no html

const http = require('http');
const fs = require('fs');

const port = 3000;      //Definindo porta

const server = http.createServer((req, res) => {

    const urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name

    if(!name) {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {

        const nameNewLine = `- ${name} \r\n \r\n` //O \r e o \n são utilizados para quebra de linha em linux e windows

        fs.appendFile('arquivo.txt', nameNewLine, function(err, data) {
            //adicionando dados em um arquivo (caso o arquivo não exista é criado um)
            res.writeHead(302, {
                location: "/"
            })
            return res.end()
        })
    }    

})

server.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})