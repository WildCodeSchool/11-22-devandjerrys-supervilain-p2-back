const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const serverPort = 4242
const app = express()

const data = require('./super.json')

app.use(morgan('tiny'))
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  console.log('une nouvelle requête est arrivée dans l’API !  ')
  res.json('je suis dans le /')
})
app.get('/catalogue', (req, res) => {
  res.json(data)
})

app.listen(serverPort, () => console.log('http://localhost:4242'))
app.get('/catalogue/vilain', (req, res) => {
  const thing = data.filter(superMechant => superMechant.alignment === 'bad')
  if (thing) {
    res.send(thing)
  } else {
    console.log('404')
  }
})
app.get('/catalogue/heros', (req, res) => {
  const thing = data.filter(superHeros => superHeros.alignment === 'good')
  if (thing) {
    res.send(thing)
  } else {
    console.log('404')
  }
})
