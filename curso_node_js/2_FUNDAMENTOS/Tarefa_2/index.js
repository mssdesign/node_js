const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer
  .prompt([
    {
      name: 'p1',
      message: 'Quantos anos você tem?',
    },
    {
      name: 'p2',
      message: 'Qual é o seu nome?',
    },
  ])
  .then((res) => {
    console.log(chalk.bgYellow.black(res['p1'], res['p2']))
  })
  .catch((err) => console.log(err))
