const githubToken = ""
const githubApi = "https://api.github.com/graphql"
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: githubApi + '?access_token=' + githubToken,
  headers: {
    'User-Agent': 'Github-Insights'
  }
});

fetch({
  query: '{ viewer { login }}',
}).then(res => {
  console.log(res.data);
});
