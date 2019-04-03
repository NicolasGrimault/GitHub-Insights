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


  results = await getResultsAsync(req.params.id)
  response.send(results)
})

app.listen(port)


const getResultsAsync = async (orgaName) => {
  var repositories = []
  var cursor = ""
  var hasNextPage = true
  while (hasNextPage) {
    var requ = `
  {
    viewer {
      organization(login: "${orgaName}") {
        repositories(first: 100, after: "${cursor}") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
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
    const results = await fetch({ query: requ, })
      .then(res => res.data);
    results.viewer.organization.repositories.edges.forEach(element => {
      repositories.push(element)
    });
    hasNextPage = results.viewer.organization.repositories.pageInfo.hasNextPage
    cursor = results.viewer.organization.repositories.pageInfo.endCursor
  }
  return repositories
}

