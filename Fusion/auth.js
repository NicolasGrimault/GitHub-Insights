const request = require('request');
const express = require('express')
require('dotenv').config();

const clientId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET

const app = express()

app.get('/callback', function (req, response) {
  var options = {
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${req.query.code}`,
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }
  request(options, function (error, gitResponse, body) {
    if (!error && gitResponse.statusCode == 200) {
      response.cookie('token',JSON.parse(body).access_token)
      response.redirect('http://localhost:8080/')
    }
  })
})

app.get('/login', function (req, response) {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,read:user,read:org`)
})

app.use(express.static(__dirname + '/public'))

app.listen(8080)



