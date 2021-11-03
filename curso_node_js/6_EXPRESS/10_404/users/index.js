const express = require('express');
const router = express.Router();
const path = require('path');

//caminho padrão (diretório inicial)
const basePath = path.join(__dirname, '../templates') //"__dirname" -> possui 2 underlines

//Visualizando o formulário
router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

//Pegando dados do input e visualizando no terminal
router.post('/save', (req, res) => {
  console.log(req.body) //Exemplo de output aqui: { name: 'teste', age: '50' }

  const name = req.body.name
  const age = req.body.age

  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)

  res.sendFile(`${basePath}/userform.html`) //Redireciona para a página formulário novamente
})

//Buscando por usuário teste
router.get('/:id', (req, res) => {
  const id = req.params.id

  //leitura da tabela, resgatar um usuário do banco
  console.log(`Buscando pelo usurário: ${id}`)

  res.sendFile(`${basePath}/users.html`)
})

module.exports = router;
