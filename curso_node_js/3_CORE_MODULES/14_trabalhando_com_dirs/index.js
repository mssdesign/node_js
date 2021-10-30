//Criando pasta ou não dependendo da existência dela

const fs = require('fs');

if (!fs.existsSync('./minhapasta')) {

    console.log('Não existe! Criando pasta...')
    fs.mkdirSync('minhapasta')

} else if (fs.existsSync('./minhapasta')) {

    console.log('Existe!')

}