//Descobrindo o caminho do arquivo e nome do arquivo a partir do node js

const path = require('path');

const customPath = "/relatorios/matheus/relatorio1.pdf" //Caminho fictício

console.log(path.dirname(customPath))       //nome do diretório (caminho do arquivo)
console.log(path.basename(customPath))      //nome do arquivo (basename)
console.log(path.extname(customPath))      //tipo de arquivo (extname = nome da extensão)
