const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const apiKey = 'YOUR_API_KEY_HERE'; // Replace 'YOUR_API_KEY_HERE' with your actual API key

async function checkWeather(city) {
    const response = await fetch(`${url}${city}&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " kmph";

        if (data.weather[0].main == 'Snow') {
            weatherIcon.src = "./snow.png";
        } else if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = "./clouds.png";
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = "./rain.png";
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "./drizzle.png";
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = "./clear.png";
        } else {
            weatherIcon.src = "./mist.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Function to display temporary message
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    setTimeout(() => {
        messageElement.remove();
    }, 3000); // Remove the message after 3 seconds
}

// Function to perform search
function performSearch() {
    const cityName = searchBox.value.trim();
    if (cityName !== '') {
        displayMessage(`Searching for ${cityName}`);
        checkWeather(cityName);
    }
}

// Event listener for the input field
searchBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Event listener for the search button
searchBtn.addEventListener("click", performSearch);
