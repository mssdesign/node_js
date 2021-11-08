const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

//Definindo handlebars como template engine e executando o handlebars
app.engine('handlebars', exphbs()) 
app.set('view engine', 'handlebars') 

//Criando rota para renderizar
app.get('/', (req, res) => {

    const user = {
        name: 'Matheus',
        surname: 'Soares',
        age: 22
    }

    res.render('home', { user: user }) // { user: user } Adiciona as variáveis que estarão disponíveis no html
})

app.listen(3000, () => {
    console.log('App funcionando')
})