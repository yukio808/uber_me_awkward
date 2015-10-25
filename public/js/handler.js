$(function(){
  $('button.init').on('click', function(){
    if(!localStorage.auth_token){
      $.post('/api/request_ride', {
        source      : {lat: '21.2969690', lng: '-157.8565750'},
        destination : {lat: '21.3607130', lng: '-157.8887950'},
      }
    ).done(function (data){
      if(data.popupUrl){
        window.location.replace(data.popupUrl);
      }
    });
    }
    $.post('/api/request_ride', {
        source      : {lat: '21.2969690', lng: '-157.8565750'},
        destination : {lat: '21.3607130', lng: '-157.8887950'},
        auth_token  : localStorage.auth_token
      }
    ).done(function (data){
      console.log(data);
    });
  });
  $('button.products').on('click', function (){
    $.post( '/api/products', {
        source      : {lat: '21.2969690', lng: '-157.8565750'},
      }).done(function (data){
        data = JSON.parse(data);
    });
  });
});