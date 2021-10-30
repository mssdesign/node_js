//Roteamento de páginas lendo arquivos html a partir do URL

const http = require('http');
const fs = require('fs');
const url = require('url')

const port = 3000;      //Definindo porta

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true)
    const filename = q.pathname.substring(1)

    if(filename.includes('html')) {
        if(fs.existsSync(filename)) {

            //lendo o arquivo html passado na URL
            fs.readFile(filename, function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                return res.end()
            })

        } else {
            
            //caso o arquivo html passado não seja encontrado
            fs.readFile('404.html', function (err, data) {
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.write(data)
                return res.end()
            })

        }

    } else {

        //Caso não seja passado um arquivo html na url
        fs.readFile('404.html', function (err, data) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.write(data)
            return res.end()
        })
    }

})

server.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})