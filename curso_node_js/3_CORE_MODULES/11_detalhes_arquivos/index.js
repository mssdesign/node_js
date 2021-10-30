//Visualizando dados sobre arquivo a partir do fs.stat

const fs = require('fs');

fs.stat('novoarquivo.txt', (err, stats) => {

    if(err) {
        console.log(err)
        return
    }

    console.log(stats.isFile())     //É um arquivo?
    console.log(stats.isDirectory())//É uma pasta?
    console.log(stats.isSymbolicLink())// É um link simbólico?
    console.log(stats.ctime)        //Data de criação
    console.log(stats.size)         //Tamanho do arquivo em bites

})