



"http"//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=43a92b3ec7857e2e1b45068a9ba0aedd
var response = "43a92b3ec7857e2e1b45068a9ba0aedd";
var response = "43a92b3ec7857e2e1b45068a9ba0aedd";
var APIKey = "43a92b3ec7857e2e1b45068a9ba0aedd";
var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";
var cityName = "";
var listOfSearchedCities = [];

var getSeachedCitiesFromLS = JSON.parse(localStorage.getItem(""));
if (getSeachedCitiesFromLS !== null) {
  getSeachedCitiesFromLS.forEach(function(city) {city.toUpperCase();});
  listOfSearchedCities = getSeachedCitiesFromLS;  
}





  if (cityName !== ""&& listOfSearchedCities[0] !== cityName) {
    listOfSearchedCities.unshift(cityName);
    localStorage.setItem("", JSON.stringify(listOfSearchedCities));
    if (listOfSearchedCities.length === 1) {
      $("#searched-cities-card").removeClass("");
    }
    
   
   
  }
;



function displayCurrentWeather() {
  var cardDiv = $("");
  var weatherImage = $("").attr('', currentWeatherIconUrl);
  var cardHeader = $("").text(city + " " + currentDate.toString());
  cardHeader.append(weatherImage);
  var temperatureEl = $("<p>").text(" " + tempF+ " ");
  var humidityEl = $("<p>").text(" " + humidityValue + "");
  var windSpeedEl = $("<p>").text(" " + windSpeed + "");
  var uvIndexEl = $("<p>").text(" ");

  var uvIndexValueEl = $("").text(uvIndexValue).css("", getColorCodeForUVIndex(uvIndexValue)); 
  uvIndexEl.append(uvIndexValueEl);
  cardDiv.append(cardHeader);
  cardDiv.append(temperatureEl);
  cardDiv.append(humidityEl);
  cardDiv.append(windSpeedEl);
  cardDiv.append(uvIndexEl);
  $("#current-weather-conditions").append(cardDiv);
}

function displayDayForeCast() { 
  var imgEl = $("<img>").attr("src", iconurl);  
  var cardEl = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
  var cardBlockDiv = $("<div>").attr("class", "card-block");
  var cardTitleDiv = $("<div>").attr("class", "card-block");
  var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
  var cardTextDiv = $("<div>").attr("class", "card-text");
  var minTempEl = $("<p>").text("Min Temp: " + minTempF + " ºF").css("font-size", "0.60rem");
  var maxTempEl = $("<p>").text("Max Temp: " + maxTempF + " ºF").css("font-size", "0.60rem");
  var humidityEl = $("<p>").text("Humidity: " + dayhumidity + "%").css("font-size", "0.60rem");

  cardTextDiv.append(imgEl);
  cardTextDiv.append(minTempEl);
  cardTextDiv.append(maxTempEl);
  cardTextDiv.append(humidityEl);
  cardTitleDiv.append(cardTitleHeader);
  cardBlockDiv.append(cardTitleDiv);
  cardBlockDiv.append(cardTextDiv);
  cardEl.append(cardBlockDiv);
  $(".card-deck").append(cardEl);
}

function addCardDeckHeader() {
  deckHeader = $("<h4>").text("5-Day Forecast").attr("id", "card-deck-title");
  deckHeader.addClass("pt-4 pt-2");
  $(".card-deck").before(deckHeader);
}

function clearDisplayedWeatherInfo() {
  $("#current-weather-conditions").empty();
  $("#card-deck-title").remove();
  $(".card-deck").empty();
}

function displayCities(citiesList) {
  $("#searched-cities-card").removeClass("hide");
  var count = 0;
  citiesList.length > 5 ? count = 5 : count = citiesList.length
  for (var i=0; i < count; i++) {
    $("#searched-cities-list").css("list-style-type", "none");
    $("#searched-cities-list").append(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
    <li>${citiesList[i]}</li>
    </a>`);
  }
}

function getColorCodeForUVIndex(uvIndex) {
  var uvIndexValue = parseFloat(uvIndex);
  var colorcode = "";
  if (uvIndexValue <= 2) {
    colorcode = "#00ff00";
  }
  else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
    colorcode = "#ffff00";
  }
  else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
    colorcode = "#ffa500";
  }
  else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
    colorcode = "#9e1a1a";
  }
  else if (uvIndexValue > 10) {
    colorcode = "#7f00ff";
  }
  return colorcode;
}

function resetGlobalVariables() {
  city = "";
  currentDate = "";
  tempF = "";
  humidityValue = "";
  windSpeed = "";
  uvIndexValue = "";
  latitude = "";
  longitude = "";
  minTempK = "";
  maxTempK = "";
  minTempF = "";
  maxTempF = "";
  dayhumidity = "";
  currentWeatherIconCode = "";
  currentWeatherIconUrl = "";
  iconcode = "";
  iconurl = "";
  country = "";
}

$( "#city-form" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    searchCity($("#city-search").val());
  });
function searchCity(cityName){

 console.log(cityName);
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
 cityName + "&APPID=43a92b3ec7857e2e1b45068a9ba0aedd"
console.log(queryURL)

 $.get(queryURL, function( data ) {
     console.log(data)
 })
  


 .then(function(response) {
   var result = response;
   console.log(result);
   city = result.name.trim();
  
  currentDate = moment.unix(result.dt).format("l");
  console.log(currentDate);
   var tempK = result.main.temp;
   
   tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(1);
   humidityValue = result.main.humidity;
   windSpeed = result.wind.speed;
   currentWeatherIconCode = result.weather[0].icon;
   currentWeatherIconUrl = "" + currentWeatherIconCode + ".png";
   var latitude = result.coord.lat;
   var longitude = result.coord.lon;
   var uvIndexQueryUrl = "" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
   $.ajax({
     url: uvIndexQueryUrl,
     method: "GET"
   })
   .then(function(response) {
     uvIndexValue = response.value;
     displayCurrentWeather()
      
     var fiveDayQueryUrl = "" + city + "&appid=" + APIKey + "&cnt=5";
     $.ajax({
       url: fiveDayQueryUrl,
       method: "GET"
     })
     .then(function(response) {
       var fiveDayForecast = response.list;
       addCardDeckHeader()
       for (var i=0; i < 5; i++) {
         iconcode = fiveDayForecast[i].weather[0].icon;
         iconurl = "" + iconcode + ".png";
        
        dateValue = moment.unix(fiveDayForecast[i].dt).format('l');
         minTempK = fiveDayForecast[i].temp.min;
         minTempF =  ((minTempK - 273.15) * 1.80 + 32).toFixed(1);
         maxTempK = fiveDayForecast[i].temp.max;
         maxTempF =  (((fiveDayForecast[i].temp.max) - 273.15) * 1.80 + 32).toFixed(1);
         dayhumidity = fiveDayForecast[i].humidity;
         displayDayForeCast()
       } 
     });      
   }); 
 });
}