//Obtendo dados sobre o sistema operacional com Node JS

const os = require('os')



console.log(os.cpus()) //Quantos CPUs tem o servidor

console.log(os.freemem()) //Quanto de memória ram em bites tem livre tem na máquina

console.log(os.homedir()) //Qual é o diretório principal da home

console.log(os.type()) //Qual é o tipo de sistema operacional