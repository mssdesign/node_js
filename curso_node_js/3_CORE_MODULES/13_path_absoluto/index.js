//Descobrindo caminho de pasta
const path = require('path');

console.log(path.resolve('./teste.txt')) //Descobre o caminho de um arquivo



//Formar path
const midFolder = 'relatórios'
const fileName = 'matheus.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)