const compression = require('compression');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const axios = require('axios')
const port = 80

app.use(compression())
app.set('view engine', 'ejs');

// IMPORT ROUTES
//localhost:8080/
app.use('/', require('./routes/pages'))
//localhost:8080/api/attack
app.use('/api', require('./routes/api'))
//localhost:8080/public
app.use('/public', require('./routes/public'))

app.use(express.static('routes'))

// PROXY SERVER TO PREVENT CORS WEB BROWSERS' POLICY
app.post('/proxyServer', (req, res) => {
  let endpoint = req.body.url
  axios
    .get(endpoint)
    .then(response => {
      res.setHeader('Content-Type', 'text/plain')
      res.send(response.data)
    })
    .catch(err => {
      //res.json(err)
      res.status(404).send()
    })
})

// 404 not found
app.use((req, res) => {
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('pages/404.ejs', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
})

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION);
// LISTEN
app.listen(port)