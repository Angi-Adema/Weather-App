var searchButton = document.getElementById('search-button');

//Create a function that will send the request to the API for the data.
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'
//Fetch request for the data.
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data) 
        })
//Create for loop to loop through obtained data.

//Create elements.

//Set the text of the link and the href of the link. (Ins Activity 3)

//Append the new elements.
}

searchButton.addEventListener('click', getApi);