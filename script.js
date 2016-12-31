/* eslint-env jquery, node, mocha */
/*eslint no-console: 1 */

// small but cool objective approach
// http://stackoverflow.com/questions/35370289/javascript-scope-and-global-variables

$().ready(function () {

  // singleton of engine
  var wikiSearchEngine = (function () {
      var instance;
      
      function createInstance() {
          var object = { 
            // app makes request
            getData : function () {
              // $ get search data from form
              var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=metal&srlimit=50&titles=metal&origin=*";
              $.getJSON(url, function (data) {
                console.log(data);
                object.setResults(data);
              });
            },
            setResults : function (data){
              var results = [];
              // get all of the results
              search.forEach(function(element) {
                var obj = {};
                obj.title = element.title;
                obj.snippet = element.snippet;
                results.push(obj);
              }, this);
               
              console.log('data.query.search.length: ' + data.query.search.length);
              var pagesNum = data.query.search.length/10;

              
              // handle data 
              // liczba danych 
            },
            getRadomData : function (){
               // $ get search data from form
            }
          }
          return object;
      }

      return {
          getInstance: function () {
              if (!instance) {
                  instance = createInstance();
              }
              return instance;
          }
      };
  })();
 
  run();

  function run() {
  
      var engine = wikiSearchEngine.getInstance();
      // przypis przyciskowi random funckje engine.
      engine.getData();
  }
});

//   // get data from Open Weather API
//   function getWeatherData(lat, lon) {
//     console.log('lat: ' + lat + ', lon :' + lon);
//     var url = 'http://api.openweathermap.org/data/2.5/weather?&lat=' + lat + '&lon=' + lon + '&appid=030d7de8a214a9bde023ab75b4453c13&units=metric';
//     $.getJSON(url, setWeather, failure)
//       .catch(function (error) {
//         console.error(error)
//       });
//   }

//   function setWeather(json) {
//     $('#mainWeather').html(json.weather[0].description + ' ');
//     $('#mainWeather').prepend('<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png">');
//     var temperature = json.main.temp;
//     $('#temp').html(temperature + ' °C ');
//     $('#temp').on('click', { value: temperature }, setTempMetric);
//     $('#humidity').html(json.main.humidity + ' %');
//     $('#wind').html(json.wind.speed + ' km/h');
//     $('#clouds').html(json.clouds.all + ': %');
//     setBackground(json.weather[0].icon);
//     $('.mainWeather').show();
//   }

//   function setTempMetric(event) {
//     if (isCelsius) {
//       // przelicz na F
//       var temperature = event.data.value * 1.8 + 32;
//       $('#temp').html(temperature + ' °F ');
//       $('#otherTemp').html('| °C');
//       isCelsius = !isCelsius;
//     }
//     else {
//       // przelicz na C
//       $('#temp').html(event.data.value + ' °C ');
//       $('#otherTemp').html('| °F');
//       isCelsius = !isCelsius;
//     }
//   }
  
//   function failure() {
//     $('#mainWeather').html('<h2>Sorry, but there\'s a temporary server problem </h2>');
//   }

//   function setBackground(value) {
//     switch (value) {
//       case '01d':
//       case '01n':
//         $('body').addClass('clearSky');
//         break;
//       case '02d':
//       case '02n':
//         $('body').addClass('fewClouds');
//         break;
//       case '03d':
//       case '03n':
//         $('body').addClass('scatteredClouds');
//         break;
//       case '04d':
//       case '04n':
//         $('body').addClass('brokenClouds');
//         break;
//       case '09d':
//       case '09n':
//         $('body').addClass('showerRain');
//         break;
//       case '10d':
//       case '10n':
//         $('body').addClass('rain');
//         break;
//       case '11d':
//       case '11n':
//         $('body').addClass('thunderstorm');
//         break;
//       case '13d':
//       case '13n':
//         $('body').addClass('snow');
//         break;
//       case '50d':
//       case '50n':
//         $('body').addClass('mist');
//         break;
//     }
//   }
// });