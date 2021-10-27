const express = require('express')
const OAuthClient = require('intuit-oauth')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.PORT || 3000

let urlencodedParser = bodyParser.urlencoded({extended:true})
let oauth2_token_json = null
let oauthClient = null;

app.get('/authUri', urlencodedParser, (req,res) => {
    oauthClient = new OAuthClient({
        clientId: "ABVilsiVh4HwrcrM4QaUO5lThBMTWUSrMfMItT00jLub7BZwnW",
        clientSecret: "3kZnYLeV08rVv7d2HaUkahRgUKbqvj7bA8zD9fLl",
        environment: "sandbox",
        redirectUri:"http://localhost:3000/callback"
    })
    let authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting],state: 'testState'})
    res.redirect(authUri)
})

app.get('/callback', function(req, res) {

    oauthClient.createToken(req.url)
       .then(function(authResponse) {
             oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
         })
        .catch(function(e) {
             console.error(e);
         });

    res.redirect('/')

});



app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})

app.get('/', (req,res) => {
    res.send('hello from server')
})