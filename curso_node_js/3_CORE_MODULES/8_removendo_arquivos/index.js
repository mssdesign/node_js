//Removendo arquivo
//Para textar crie um arquivo com o nome 'arquivo.txt'

const fs = require('fs');

fs.unlink('arquivo.txt', function(err) {

    if(err) {
        console.log(err)
        return
    }

    console.log('arquivo removido!')

});