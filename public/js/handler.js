$(function(){
  $('button[name="init"]').on('click', function(){
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
        auth_token  : localStorage.auth_token,
        product_id  : $('option:selected').val()
      }
    ).done(function(data) {
      checkStatus(data);
    });
    
  });
  function getProduct () {
    $.post( '/api/products', {
        source      : {lat: '21.2969690', lng: '-157.8565750'},
      }).done(function (data){
        data = JSON.parse(data);
        for (var i = 0; i < data.products.length; i++) {
          $('select[name="ubertypes"]').append('<option name="product", value='+ data.products[i].product_id +'>'+ data.products[i].display_name +'</option>');
        };
    });
  };
  function checkStatus (data){
    $.post('/api/request_ride/status', {
        request_id  : data.request_id,
        auth_token  : localStorage.auth_token,
      }
    ).done(function(data) {
      console.log(data) // do the shaking api
    })
  }
  getProduct();
});