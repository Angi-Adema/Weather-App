var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var apiKey = 'aea21397c6d9dfc11ba04ff29f0547e6';
var currentContainer = document.getElementById('current-day-container');
var fivedayContainer = document.getElementById('five-day-container');

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
            getfiveDay(lat, lon)
            getCurrentWeather(lat, lon)
        })
}


function getCurrentWeather(lat, lon) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("CURRENT WEATHER!!! ", data);

            var currentday = document.createElement('h2');
            currentday.textContent = 'Current Day Forcast:'

            //Create elements for current day.
            var date = new Date(data.dt * 1000).toLocaleDateString()
            var icon = daysArr[i].weather[0].icon;
            var temp = daysArr[i].main.temp;
            var wind = daysArr[i].wind.speed;
            var humidity = daysArr[i].main.humidity;

            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

            //Add attributes for the elements.
            dateEl.setAttribute('class', 'card-title');
            iconEl.setAttribute('src', iconUrl);
            tempEl.setAttribute('class', 'card-text');
            windEl.setAttribute('class', 'card-text');
            humidityEl.setAttribute('class', 'card-text');

            //Set content for those attributes.


        })
            //Append elements.
            currentContainer.append(currentday);
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
            var fiveDayheading = document.createElement('h2');
            var cardContainer =  document.createElement('div');
            cardContainer.setAttribute('class', 'row');

            fiveDayheading.textContent = '5-Day Forcast:'

            // //Create for loop to loop through obtained data.
            for (var i = 0; i < daysArr.length; i++) {
                console.log(daysArr[i]);
                // create all data variables from the daysarr
                var date = new Date(daysArr[i].dt * 1000).toLocaleDateString()
                var icon = daysArr[i].weather[0].icon;
                var temp = daysArr[i].main.temp;
                var wind = daysArr[i].wind.speed;
                var humidity = daysArr[i].main.humidity;

                //Create elements.
                var cardEl = document.createElement('div');
                var cardBodyEl = document.createElement('div');
                var dateEl = document.createElement('h3');
                var iconEl = document.createElement('img');
                var tempEl = document.createElement('p');
                var windEl = document.createElement('p');
                var humidityEl = document.createElement('p');

                var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                // add attributes for the card classes bootstrap
                cardEl.setAttribute('class', 'card col-2 m-1');
                iconEl.setAttribute('src', iconUrl);
                cardBodyEl.setAttribute('class', 'card-body');
                dateEl.setAttribute('class', 'card-title');
                tempEl.setAttribute('class', 'card-text');
                windEl.setAttribute('class', 'card-text');
                humidityEl.setAttribute('class', 'card-text');

                //Set content to the attributes.
                dateEl.textContent = date
                tempEl.textContent =  'TEMP: ' + temp;
                windEl.textContent = 'WIND: ' + wind;
                humidityEl.textContent =  'HUMIDITY: ' + humidity;

                //Append the new elements.
                cardBodyEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);
                cardEl.append(cardBodyEl);
                cardContainer.append(cardEl);
            }

            fivedayContainer.append(fiveDayheading, cardContainer);
        });


}




searchButton.addEventListener('click', handleUserInput);

//Create a form to search for the city. (Be sure city name, date, weather icon, temp, humidity & windspeed.)
//Be sure UV index shows a color base on favorable or unfavorable conditions.
//Be sure it shows a 5-day forcast for the city searched for showing (date, weather icon, temp, windspeed & humidity).

//Create search history in local storage with buttons to be clicked on for future reference.


