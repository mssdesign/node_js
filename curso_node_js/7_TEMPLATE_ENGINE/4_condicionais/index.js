const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

//Definindo handlebars como template engine e executando o handlebars
app.engine('handlebars', exphbs()) 
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

//Criando rota para renderizar
app.get('/', (req, res) => {

    const user = {
        name: 'Matheus',
        surname: 'Soares',
        age: 22
    };

    const palavra = 'Sou fera';

    const auth = true; //Boleano para ser utilizado no HTML

    res.render('home', { user: user, palavra, auth }) // { user: user } Adiciona as variáveis que estarão disponíveis no html
})

app.listen(3000, () => {
    console.log('App funcionando')
})