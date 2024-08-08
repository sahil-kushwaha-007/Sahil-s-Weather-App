const API_KEY = '12a48e7bf64a1e2060970c07d70e183a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

function getWeather() {
    const city = document.getElementById('city').value;
    const url = `${BASE_URL}q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                handleError(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again later.');
        });
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = `City: ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;

    document.getElementById('weather-info').style.display = 'block';

    changeBackground(data.weather[0].main);
}

function handleError(data) {
    console.error('Error response from API:', data);
    if (data.cod === '404') {
        alert('City not found. Please check the city name and try again.');
    } else {
        alert('Error: ' + data.message);
    }
}

function changeBackground(weatherCondition) {
    const body = document.body;
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            body.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
        case 'clouds':
            body.style.background = 'linear-gradient(to right, #d7d2cc, #304352)';
            break;
        case 'rain':
            body.style.background = 'linear-gradient(to right, #000046, #1cb5e0)';
            break;
        case 'snow':
            body.style.background = 'linear-gradient(to right, #e6dada, #274046)';
            break;
        case 'thunderstorm':
            body.style.background = 'linear-gradient(to right, #0f0c29, #302b63, #24243e)';
            break;
        case 'drizzle':
            body.style.background = 'linear-gradient(to right, #89f7fe, #66a6ff)';
            break;
        case 'smoke':
            body.style.background = 'linear-gradient(to right, #636363, #a2ab58)';
            break;
        case 'cold':
            body.style.background = 'linear-gradient(to right, #00f260, #0575e6)';
            break;
        default:
            body.style.background = 'linear-gradient(to right, #ffefba, #ffffff)';
            break;
    }
}
