const x = 10;

//Checar se x é número
if(!Number.isInteger(x)) {
    throw new Error('O valor de X não é um número inteiro!')
}

console.log('Continuando...')