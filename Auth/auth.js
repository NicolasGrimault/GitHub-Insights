const request = require('request');
const express = require('express')

const clientId = 'df26091268bce90e6f1e'
const clientSecret = '54a9e22f48fed4ebf0c253499e0ea5713fa52b1e'

const app = express()

app.get('/callback', function (req, response) {
  var options = {
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${req.query.code}`,
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }
  request(options, function (error, gitResponse, body) {
    if (!error && gitResponse.statusCode == 200) {
      response.send(JSON.parse(body).access_token)
    }
  })
})

app.use(express.static(__dirname + '/public'))

app.listen(8080)



