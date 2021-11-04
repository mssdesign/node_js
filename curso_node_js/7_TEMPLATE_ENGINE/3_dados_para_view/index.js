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
        surname: 'Soares'
    }

    res.render('home', { user: user })
})

app.listen(3000, () => {
    console.log('App funcionando')
})