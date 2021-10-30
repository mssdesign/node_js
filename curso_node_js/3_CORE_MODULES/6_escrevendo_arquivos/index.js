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
        fs.writeFile('arquivo.txt', name, function(err, data) {
            //O método writeFile substitui o arquivo. Para adicionar utilize o appendFile
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