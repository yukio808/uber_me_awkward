// module/dependancies/env =================================================
var app               = require('express');
var router            = app.Router();
var request           = require('request');
var OAuth2            = require('oauth').OAuth2;
var uberApiUrl        = 'https://sandbox-api.uber.com/v1/';
var uberServerToken   = process.env.UBER_SERVER_TOKEN;
var uberClientID      = process.env.UBER_CLIENT_ID;
var uberClientSecret  = process.env.UBER_CLIENT_SECRET;
var serverUrl         = 'http://' + require("os").hostname() + ':' + ( process.env.PORT || 3000 );
//==========================================================================
var oauth2 = new OAuth2(
  uberClientID,
  uberClientSecret,
  'https://login.uber.com/',
  'oauth/authorize',
  'oauth/token',
  null
);
// Get: Ride estimate URL
//
router.get('/', function (req, res){
 res.render('index');
});

router.get('/estimate/price', function (req, res){
  //Temporary lat long for dev puproses only depricate and use req from front end.
  var source = {lat: '21.2969690', lng: '-157.8565750'};
  var destination = {lat: '21.3607130', lng: '-157.8887950'};

  request.get({
    url : uberApiUrl + 'estimates/price',
    strictSSL: false,
    qs : {
      server_token : uberServerToken,
      start_latitude : source.lat,
      start_longitude : source.lng,
      end_latitude : destination.lat,
      end_longitude : destination.lng
    }
  }, function(err, response, body){
    if(err){
      return res.json(err);
    }
    console.log('response, body', body);
    res.render('index', {response: body});
  });
});

// Post: Request Ride
//





////
function closeAndRedirectScript(access_token) {
  return '<script> \
          if (window.opener != null && !window.opener.closed){ \
            window.opener.location = "'+redirectAccessTokenUrl(access_token)+'"; \
            window.close(); \
          }else{ \
            document.write("Pop-up blocker prevented proper authorization process. Please disable and re-authorize."); \
          } \
          </script>';
}

function redirectAccessTokenUrl(access_token) {
  return serverUrl + '#store-auth-token/' + access_token;
}

function getAuthorizeUrl(){
  return oauth2.getAuthorizeUrl({
    redirect_uri: serverUrl + '/api/oauth/cb',
    scope: ['request'],
    state: 'authorizing',
    response_type: 'code'
  });
}

// add database code here


module.exports = router;