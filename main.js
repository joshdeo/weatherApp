const appID = '53c23cd34223c989b2b06a4b24172696';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q'
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("./resources/Images/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("./resources/Images/cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("./resources/Images/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./resources/Images/storm.jpg")';
            break

        case 'Snow':
            document.body.style.backgroundImage = 'url("./resources/Images/snow.jpg")';
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentImgIcon');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s'
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'humidity levels at' + resultFromServer.main.humidity + '%';



    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(65% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(30% - ${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = 'visible';

    //GRAPH VISIBILITY
    let graphDim = document.getElementById('graphContainer');
    graphDim.style.visibility = 'visible';
}

//Click Event
document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
});

//GRAPHS


let myChartWind = document.getElementById('wind').getContext('2d');
let Chartaz = new Chart(myChartWind, {
    type: 'bar',
    data: {
        labels: ['wind(kph)'],
        datasets: [{
            label: 'wind (KPH)',
            data: [
                40,
            ],
            backgroundColor: '#fff6a4',
        }],
    },
    options: {}
});

let myChartTemp = document.getElementById('temp').getContext('2d');
let Chartaz1 = new Chart(myChartTemp, {
    type: 'bar',
    data: {
        labels: ['UV'],
        datasets: [{
            label: 'UV light',
            data: [
                40,
            ],
            backgroundColor: '#fff6a4',
        }],
    },
    options: {}
});

let myChartHumid = document.getElementById('humid').getContext('2d');
let Chartaz2 = new Chart(myChartHumid, {
    type: 'bar',
    data: {
        labels: ['Relative Humidity'],
        datasets: [{
            label: 'Humidity %',
            data: [
                50,
            ],
            backgroundColor: '#fff6a4',
        }],
    },
    options: {}
});