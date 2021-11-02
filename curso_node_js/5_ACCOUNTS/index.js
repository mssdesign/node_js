//módulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

//módulos internos
const fs = require('fs')

operation()

//Painel Inicial
function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Transferir',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']

      if (action === 'Criar conta') {
        createAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance()
      } else if (action === 'Sacar') {
        withDraw()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
      } else if (action === 'Transferir') {
        sendMoney()
      }
    })
    .catch((err) => console.log(err))
}

//Criando Conta
function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir:'))

  buildAccount()
}

//Construindo conta
function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para a sua conta:',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      console.info(accountName)

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
        )

        buildAccount()
        return
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err)
        }
      )

      console.log(chalk.green('Parabéns, a sua conta foi criada!'))
      operation()
    })
    .catch((err) => console.log(err))
}

//Depositando
function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      //Verify if account exists
      if (!checkAccount(accountName)) {
        return deposit()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']

          if (amount <= 0) {
            console.log('Erro, tente novamente!')
            return deposit()
          }

          //add an amount
          addAmount(accountName, amount)
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

//Checando se existe
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, tente novamente.'))
    return false
  }

  return true
}

//Adicionando valores
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    )
    return deposit()
  }

  accountData.balance += parseFloat(amount + parseFloat(accountData))

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
  )
  operation()
}

//Pegando dados da conta
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r', //Só para ler
  })

  return JSON.parse(accountJSON)
}

//Mostrando extrato da conta
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      //verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance()
      }

      const accountData = getAccount(accountName)

      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance},00`
        )
      )
      operation()
    })
    .catch((err) => console.log(err))
}

//Tirando dinheiro
function withDraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      if (!checkAccount(accountName)) {
        return withDraw()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']

          removeAmount(accountName, amount)
          operation()
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

//Sacando dinheiro
function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
    return withdraw()
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Saldo insuficiente!'))
    return withDraw()
  }

  accountData.balance -= parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(
    chalk.green(
      `Foi realizado um saque de R$${amount},00 da sua conta. Parabéns!`
    )
  )
}

//Transferindo dinheiro
function sendMoney() {
  inquirer
    .prompt([
      {
        name: 'sender',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((accountParam) => {
      const sender = accountParam['sender']

      if (!checkAccount(sender)) {
        return operation()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você quer enviar?',
          },
        ])
        .then((amountParam) => {
          inquirer
            .prompt([
              {
                name: 'receiver',
                message: 'Para quem você deseja enviar o dinheiro?',
              },
            ])
            .then((receiverParam) => {
              const receiver = receiverParam['receiver'];
              const amount = amountParam['amount'];
              const receiverData = getAccount(receiver);
              const senderData = getAccount(sender);

              if (!checkAccount(receiver)) {
                return sendMoney()
              }

              senderData.balance -= parseFloat(amount)
              receiverData.balance += parseFloat(amount)

              fs.writeFileSync(
                `accounts/${sender}.json`,
                JSON.stringify(senderData),
                function (err) {
                  console.log(err)
                }
              )

              fs.writeFileSync(
                `accounts/${receiver}.json`,
                JSON.stringify(receiverData),
                function (err) {
                  console.log(err)
                }
              )

              console.log(
                chalk.green(
                  `Parabéns, ${sender}!! O valor de R$${amount},00 foi transferido para ${receiver}. Obrigado por utilizar os nossos serviços.`
                )
              )
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}
