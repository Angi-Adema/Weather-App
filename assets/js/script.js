var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var apiKey = 'aea21397c6d9dfc11ba04ff29f0547e6';
var currentContainer = document.getElementById('current-day-container');
var fivedayContainer = document.getElementById('five-day-container');
var historyContainer = document.getElementById('history');

var searchHistory = []
//Create a function that handles the user input and removes white space.
function handleUserInput() {
    var userInput = searchInput.value.trim()
    getLatLon(userInput);
   
}
//Create a function to save userinput(city) to local storage.
function saveToLocalStorage(city){

    // check for duplicates in seach history
    if(searchHistory.indexOf(city) !== -1){
        return;
    }

    // if the city gets sent to the function we need to push it to the search history array
    searchHistory.push(city);

    // save searchHistry array into local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    button();
}
//Create a function to retrieve data from local storage to save userinput(city) buttons from previous search.
function retrieveLocalStorage(){
   var history = localStorage.getItem('searchHistory');
   if (history){
       searchHistory = JSON.parse(history)
   }
    button();
}

retrieveLocalStorage()
//Create a function to give the storage buttons click functionality.



function button() {

    historyContainer.innerHTML = ''

    for (var i = 0; i < searchHistory.length; i++) {
       
        // create
        var btn = document.createElement('button');
        // set
        btn.textContent = searchHistory[i];
        btn.setAttribute('value', searchHistory[i]);
        btn.addEventListener('click', historyBtn);
        // append
        historyContainer.append(btn);
        
    }
}

function historyBtn() {
    getLatLon(this.value)
}

//Create a function for the city data pulled from the API.
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
            saveToLocalStorage(data[0].name)
        })
}

//Create a function that takes the lat and lon in order to return the current day's weather info.
function getCurrentWeather(lat, lon) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("CURRENT WEATHER!!! ", data);

            currentContainer.innerHTML='';

          
            //Create variables for the data API call.
            var city = data.name;
            console.log(city);
            var date = new Date(data.dt * 1000).toLocaleDateString();
            var icon = data.weather[0].icon;
            var temp = data.main.temp;
            var wind = data.wind.speed;
            var humidity = data.main.humidity;

            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

            //Create the elements for the current weather.
            var cityEl = document.createElement('h2');
            var iconEl = document.createElement('img');
            var tempEl = document.createElement('p');
            var windEl = document.createElement('p');
            var humidityEl = document.createElement('p');

            //Add attributes for the elements.
            cityEl.setAttribute('class', 'card-title');
            iconEl.setAttribute('src', iconUrl);
            tempEl.setAttribute('class', 'card-text');
            windEl.setAttribute('class', 'card-text');
            humidityEl.setAttribute('class', 'card-text');

            //Set content for those attributes.
            cityEl.textContent = city + ' ' + date;
           
            tempEl.textContent =  'TEMP: ' + temp;
            windEl.textContent = 'WIND: ' + wind;
            humidityEl.textContent =  'HUMIDITY: ' + humidity;

            //Append elements.
            cityEl.append(iconEl)
            currentContainer.append(cityEl, tempEl, windEl, humidityEl);
           
        })
            
}

//Create a function that will send the request to the API for the data of the 5-day forcast.
function getfiveDay(lat, lon) {


    var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
    //Fetch request for the data.
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fivedayContainer.innerHTML = ''
            //Array of the five day data set or array.
            var daysArr = [data.list[6], data.list[14], data.list[22], data.list[30], data.list[38]];
            var fiveDayheading = document.createElement('h2');
            var cardContainer =  document.createElement('div');
            cardContainer.setAttribute('class', 'row');

            fiveDayheading.textContent = '5-Day Forcast:';

            // //Create for loop to loop through obtained data.
            for (var i = 0; i < daysArr.length; i++) {
                console.log(daysArr[i]);
                // create all data variables from the daysarr
                var date = new Date(daysArr[i].dt * 1000).toLocaleDateString();
                var icon = daysArr[i].weather[0].icon;
                var temp = daysArr[i].main.temp;
                var wind = daysArr[i].wind.speed;
                var humidity = daysArr[i].main.humidity;

                //Create elements.
                var cardEl = document.createElement('div');
                var cardBodyEl = document.createElement('div');
                var dateEl = document.createElement('h4');
                var iconEl = document.createElement('img');
                var tempEl = document.createElement('p');
                var windEl = document.createElement('p');
                var humidityEl = document.createElement('p');
                //Weather icon URL.
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
                dateEl.textContent = date;
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

//Create search history in local storage with buttons to be clicked on for future reference.


