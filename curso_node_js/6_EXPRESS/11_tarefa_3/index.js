const express = require('express');
const app = express();
const path = require('path');
const port = 5000;
const link = `http://localhost:${port}`;

const basePath = path.join(__dirname, 'templates')
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(`${basePath}/index.html`)
})

app.get('/about', function(req, res) {
    res.sendFile(`${basePath}/about.html`)
})

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
  })

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
    console.log(link)
})
