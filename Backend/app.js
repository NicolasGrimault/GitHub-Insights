const githubToken = "f9d6ff46c649600ce86c63923e87adfc76dae78a"
var request = require('request');

var options = {
  uri: 'https://api.github.com/graphql?access_token='+githubToken,
  method: 'POST',
  json: {
    "query": "query { viewer { login }}"
  },
  headers: {
    'User-Agent': 'Github-Insights'
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id)
  }
  console.log(response.body)
});