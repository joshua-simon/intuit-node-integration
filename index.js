

const express = require("express");
const app = express();
const OAuthClient = require("intuit-oauth");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

var oauth2_token_json = null,
  redirectUri = "",
  accessToken = "test";

var oauthClient = null;

app.get("/authUri", urlencodedParser, function (req, res) {
  oauthClient = new OAuthClient({
    clientId: "ABVilsiVh4HwrcrM4QaUO5lThBMTWUSrMfMItT00jLub7BZwnW",
    clientSecret: "3kZnYLeV08rVv7d2HaUkahRgUKbqvj7bA8zD9fLl",
    environment: "sandbox",
    redirectUri: "http://localhost:8000/callback",
  });

  var authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: "intuit-test",
  });
  res.send(authUri);
});

app.get("/callback", (req, res) => {
  oauthClient
    .createToken(req.url)
    .then((authResponse) => {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      let newToken = JSON.parse(oauth2_token_json);
      accessToken = newToken.access_token;
      res.redirect(`http://localhost:3000/companyInfo?token=${accessToken}`);
    })
    .catch((e) => {
      console.error(e);
    });
});

// app.get('/refreshAccessToken', function(req,res){

//     oauthClient.refresh()
//         .then(function(authResponse){
//             console.log('The Refresh Token is  '+ JSON.stringify(authResponse.getJson()));
//             oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
//             res.send(oauth2_token_json);
//         })
//         .catch(function(e) {
//             console.error(e);
//         });
// });

app.get("/getCompanyInfo", function (req, res) {
  var companyID = oauthClient.getToken().realmId;

  var url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: url + "v3/company/" + companyID + "/companyinfo/" + companyID,
    })
    .then(function (authResponse) {
      console.log(
        "The response for API call is :" + JSON.stringify(authResponse)
      );
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`💻 Server listening on port ${port}`);
});
