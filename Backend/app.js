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

app.get('/organization/:id', async function (req, response) {
  var results = await fetch({ query: GetRequest(req.params.id), })
      .then(res => res.data );
  response.send(results)
})

app.listen(port)


function GetRequest(orgaName) {
  var cursor = ""
  return `
  {
    viewer {
      organization(login: "${orgaName}") {
        repositories(first: 100, after: "${cursor}") {
          edges {
            cursor
            node {
              name
              primaryLanguage {
                name
              }
              watchers {
                totalCount
              }
              stargazers {
                totalCount
              }
              repositoryTopics(first: 100) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              defaultBranchRef {
                name
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
              issues {
                totalCount
              }
            }
          }
        }
      }
    }
  }
  `
}

