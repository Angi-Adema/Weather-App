var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var apiKey = 'aea21397c6d9dfc11ba04ff29f0547e6'

function handleUserInput() {
    var userInput = searchInput.value.trim()
    getLatLon(userInput)
}

function getLatLon(city) {
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
    fetch(url).then(function (response) {
        return response.json();
    })
        .then(function (data) {

            // create variables for lat, lon, cityname
            var lat = data[0].lat
            var lon = data[0].lon
            var city = data[0].name
            getfiveDay(lat, lon)
            getCurrentWeather(lat, lon, city)
        })
}


function getCurrentWeather(lat, lon, city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log("CURRENT WEATHER!!! ",data)
    })
}

//Create a function that will send the request to the API for the data.
function getfiveDay(lat, lon) {


    var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
    //Fetch request for the data.
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var daysArr = [data.list[6], data.list[14], data.list[22], data.list[30], data.list[38]];


            // //Create for loop to loop through obtained data.
            for (var i = 0; i < daysArr.length; i++) {
                console.log(daysArr[i]);
                //Create elements.

                //Set the text of the link and the href of the link. (Ins Activity 3)

                //Append the new elements.

            }
        })


}




searchButton.addEventListener('click', handleUserInput);

//Create a form to search for the city. (Be sure city name, date, weather icon, temp, humidity & windspeed.)
//Be sure UV index shows a color base on favorable or unfavorable conditions.
//Be sure it shows a 5-day forcast for the city searched for showing (date, weather icon, temp, windspeed & humidity).

//Create search history in local storage with buttons to be clicked on for future reference.


