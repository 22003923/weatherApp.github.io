document.getElementById("search-btn").addEventListener("click", () => {
    const cityInput = document.getElementById("city-input");
    const cityName = cityInput.value;
    const apiKey = "your_openweathermap_api_key";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherInfo(data))
        .catch(error => console.error("Error fetching weather data:", error));
});

function displayWeatherInfo(weatherData) {
    const weatherInfoDiv = document.getElementById("weather-info");
    if (weatherData.cod === "404") {
        weatherInfoDiv.innerHTML = `<h3>City not found</h3>`;
        return;
    }

    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

    weatherInfoDiv.innerHTML = `
        <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
       
        <h3>${temperature.toFixed(1)}°C</h3>
        <img src="${iconUrl}" alt="${description}" title="${description}">
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
