/*var ClientOAuth2 = require('client-oauth2')
 
var githubAuth = new ClientOAuth2({
  clientId: '27b974de82fe9b4430bc',
  redirectUri: 'http://localhost:8080/oauth/redirect',
  scopes: ['repo','read:user']
})*/
	
// Import the express lirbary
const express = require('express')

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'))

// Start the server on port 8080
app.listen(8080)