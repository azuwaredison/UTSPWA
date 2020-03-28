$(document).ready(function(){

    var _url = "https://my-json-server.typicode.com/azuwaredison/pwaapi/products"


    var dataResult = ''
    var catResult = ''
    var categories = []


    function renderPage(data){
          $.each(data, function(key, items){

            _cat = items.category

              dataResult += "<div>"
                              + "<h3>" + items.name + "</h3>"
                              + "<p>" + _cat + "</p>"
                          "<div>";

              if ($.inArray(_cat, categories) == -1 ) {
                categories.push(_cat)
                catResult += "<option value'"+ _cat +"'>" + _cat + "</option>"

              }
          })

          $('#products').html(dataResult)
          $('#cat_select').html("<option value='all' >Semua</option> " + catResult)
    }

    var networkDataRecieved = false

    //Fresh Data From Online
    var networkUpdate = fetch(_url).then(function(response){
      return response.json()
    }).then(function(data){
      networkDataRecieved = true
      renderPage(data)
    })

    //Return Data From Cache
    caches.match(_url).then(function(response){
      if (!response) throw Error('no data on cache')
        return response.json()
    }).then(function(data){
      if (!networkDataRecieved) {
        renderPage(data)
        consol.log('render data from cache')
      }
    }),catch(function(){
      return networkUpdate
    })

    //Fungsi Filter
    $("#cat_select").on('change', function(){
      updateProduct($(this).val())
    })

    function updateProduct(cat) {

      var dataResult = ''
      var _newUrl = _url

      if (cat != 'all')
        _newUrl = _url + "?category=" + cat

      $.get(_newUrl, function(data){

          $.each(data, function(key, items){
            _cat = items.category

              dataResult += "<div>"
                              + "<h3>" + items.name + "</h3>"
                              + "<p>" + _cat + "</p>"
                          "<div>";
          })


          $('#products').html(dataResult)

      })


    }


})  //End document ready jquery

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
