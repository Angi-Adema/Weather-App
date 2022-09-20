var searchButton = document.getElementById('search-button');

//Create a function that will send the request to the API for the data.
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={aea21397c6d9dfc11ba04ff29f0547e6}'
//Fetch request for the data.
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data) 

//Create for loop to loop through obtained data.
    for (var i = 0; i < data.length; i++) {
    
        //Create elements.
        
        //Set the text of the link and the href of the link. (Ins Activity 3)
        
        //Append the new elements.

    }
        })

        
    }




searchButton.addEventListener('click', getApi);

//Create a form to search for the city. (Be sure city name, date, weather icon, temp, humidity, windspeed & UV index show.)
//Be sure UV index shows a color base on favorable or unfavorable conditions.
//Be sure it shows a 5-day forcast for the city searched for showing (date, weather icon, temp, windspeed & humidity).

//Create search history in local storage with buttons to be clicked on for future reference.


