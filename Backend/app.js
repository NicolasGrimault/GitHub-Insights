const githubToken = ""
const githubApi = "https://api.github.com/graphql"
const { createApolloFetch } = require('apollo-fetch');
const express = require('express');
const app = express();
const port = 4300;

const fetch = createApolloFetch({
  uri: githubApi + '?access_token=' + githubToken,
  headers: {
    'User-Agent': 'Github-Insights'
  }
});

function SendForQuery(query, response) {
  fetch({
    query: query,
  }).then(res => {
    //console.log(res.data);
    response.send(res.data)
  });
}

app.get('/company', function (req, response) {
  SendForQuery('{ viewer { company }}', response)
})


app.listen(port)