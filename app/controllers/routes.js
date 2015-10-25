// module/dependancies/env =================================================
var app               = require('express');
var router            = app.Router();
var session           = require('express-session');
var request           = require('request');
var OAuth2            = require('oauth').OAuth2;
var uberApiUrl        = 'https://sandbox-api.uber.com/v1/';
var uberServerToken   = process.env.UBER_SERVER_TOKEN;
var uberClientID      = process.env.UBER_CLIENT_ID;
var uberClientSecret  = process.env.UBER_CLIENT_SECRET;
var serverUrl         = 'http://localhost' + ':' + ( process.env.PORT || 8080 );
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

router.get('/lynne', function (req, res){
  res.render('sublime')
})

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
router.post('/request_ride', function (req, res){
  var source = {lat: '21.2969690', lng: '-157.8565750'}; // box jelly
  var destination = {lat: '21.3607130', lng: '-157.8887950'}; // tripler army med center
  var product_id = '';
  console.log(req);

  if( !req.body.hasOwnProperty('auth_token') ){ // handler for surge pricing
    return res.json({
      success : false,
      code : 401,
      popupUrl : getAuthorizeUrl()
    });
  }

  var uberRequest = {
    start_latitude : source.lat,
    start_longitude : source.lng,
    end_latitude : destination.lat,
    end_longitude : destination.lng,
    product_id : product_id
  };

  request.post({
    url : uberApiUrl + 'requests',
    json : uberRequest,
    strictSSL: false,
    auth : {
      bearer : req.body.auth_token
    }
  }, function(err, response, body){
    if(err){
      return res.json(err);
    }
    body.success = true;
    res.json(body);
  });

});

router.get('/oauth/cb', function(req, res){
  var code = req.query.code;
  oauth2.getOAuthAccessToken(
    code,
    { // NOT IN THE UBER DOCS
      grant_type: 'authorization_code',
      redirect_uri: serverUrl+'/api/oauth/cb'
    },
    function (err, access_token, refresh_token, results){
      if(err){
        console.log(err);
        if(err.data){
          res.end(err.data);
        }else{
          res.json(err);
        }
      } else if(results.error) {
        console.log(results.error);
        res.json(results.error);
      } else {
        // got token, send back to client
        // POPUP Blocker must be disabled, or find workaround, or use redirect instead
        res.send(closeAndRedirectScript(access_token));
      }
    });
});
// get request sent 
//
////
function closeAndRedirectScript(access_token) {
  return "<script> localStorage['auth_token'] = "+ "'"+ access_token + "'" + "; window.location.replace('/api'); </script>";
}

function getAuthorizeUrl(){
  console.log('got here');
  return oauth2.getAuthorizeUrl({
    redirect_uri: serverUrl + '/api/oauth/cb',
    scope: ['request'],
    state: 'authorizing',
    response_type: 'code'
  });
}

//
module.exports = router;