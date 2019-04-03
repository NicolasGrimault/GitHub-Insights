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
  response.header("Access-Control-Allow-Origin", "*")
  results = await getResultsAsync(req.params.id)
  console.log(results)
  response.send(results)
})

app.listen(port)


function formatData(repositories) {
  var results = {}
  results['Commits'] = 0
  results['Stars'] = 0
  results['Watchers'] = 0
  results['Issues'] = 0
  results['Languages'] = {}
  results['Topics'] = {}
  results['MostStarsName'] = ""
  results['MostStars'] = 0
  results['MostWatchersName'] = ""
  results['MostWatchers'] = 0
  results['MostCommitsName'] = ""
  results['MostCommits'] = 0
  results['MostIssuesName'] = ""
  results['MostIssues'] = 0
  results['MostReleasesName'] = ""
  results['MostReleases'] = 0
  results['MostCollaboratorsName'] = ""
  results['MostCollaborators'] = 0
  results['OldestRepoName'] = ""
  results['OldestRepo'] = new Date(8640000000000000)
  results['LatestRepoName'] = ""
  results['LatestRepo'] = new Date(-8640000000000000)
  repositories.forEach(repo => {

    results['Stars'] += repo.node.stargazers.totalCount
    results['Watchers'] += repo.node.watchers.totalCount
    results['Commits'] += repo.node.defaultBranchRef.target.history.totalCount
    results['Issues'] += repo.node.issues.totalCount
    if (repo.node.primaryLanguage != null) {
      results['Languages'][repo.node.primaryLanguage.name] == null ?
        results['Languages'][repo.node.primaryLanguage.name] = 1
        :
        results['Languages'][repo.node.primaryLanguage.name] += 1
    }
    repo.node.repositoryTopics.nodes.forEach(topic => {
      if (topic.topic.name != null) {
        results['Topics'][topic.topic.name] == null ?
          results['Topics'][topic.topic.name] = 1
          :
          results['Topics'][topic.topic.name] += 1
      }
    });
    if (repo.node.stargazers.totalCount >= results['MostStars']) {
      results['MostStars'] = repo.node.stargazers.totalCount
      results['MostStarsName'] = repo.node.name
    }
    if (repo.node.watchers.totalCount >= results['MostWatchers']) {
      results['MostWatchers'] = repo.node.watchers.totalCount
      results['MostWatchersName'] = repo.node.name
    }
    if (repo.node.defaultBranchRef.target.history.totalCount >= results['MostCommits']) {
      results['MostCommits'] = repo.node.defaultBranchRef.target.history.totalCount
      results['MostCommitsName'] = repo.node.name
    }
    if (repo.node.issues.totalCount >= results['MostIssues']) {
      results['MostIssues'] = repo.node.issues.totalCount
      results['MostIssuesName'] = repo.node.name
    }
    if (repo.node.releases.totalCount >= results['MostReleases']) {
      results['MostReleases'] = repo.node.releases.totalCount
      results['MostReleasesName'] = repo.node.name
    }
    if (repo.node.collaborators.totalCount >= results['MostCollaborators']) {
      results['MostCollaborators'] = repo.node.collaborators.totalCount
      results['MostCollaboratorsName'] = repo.node.name
    }
    if (Date.parse(repo.node.createdAt) <= results['OldestRepo']) {
      results['OldestRepo'] = Date.parse(repo.node.createdAt)
      results['OldestRepoName'] = repo.node.name
    }
    if (Date.parse(repo.node.createdAt) >= results['LatestRepo']) {
      results['LatestRepo'] = Date.parse(repo.node.createdAt)
      results['LatestRepoName'] = repo.node.name
    }
  });
  return results;
}

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
              releases{
                totalCount
              }
              collaborators{
                totalCount
              }
              createdAt
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
    try {
      const results = await fetch({ query: requ, })
        .then(res => res.data);

      results.viewer.organization.repositories.edges.forEach(element => {
        repositories.push(element)
      });

      hasNextPage = results.viewer.organization.repositories.pageInfo.hasNextPage
      cursor = results.viewer.organization.repositories.pageInfo.endCursor

    } catch (error) {
      console.log("An error happened")
      return "An error happened"
    }
  }
  var res = formatData(repositories)
  return res
}

