const apiKey = "fcc8de7015bbb202209bbf0261babf4c";

// Elements
const form = document.querySelector(".search-form");
const cityInput = document.querySelector(".city-input");
const cityElement = document.querySelector(".city");
const dateElement = document.querySelector(".date");
const descriptionElement = document.querySelector(".description-text");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const windElement = document.querySelector(".wind-speed");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility");

// Fetch Weather Data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert("Error fetching data: " + error.message);
    }
}

// Update UI
function updateUI(data) {
    cityElement.textContent = data.name;
    dateElement.textContent = new Date().toDateString();
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    iconElement.textContent = getWeatherIcon(data.weather[0].main);
    windElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    visibilityElement.textContent = `${data.visibility / 1000} km`;
}

// Weather Icon Mapping
function getWeatherIcon(condition) {
    const icons = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "blur_on",
        Smoke: "smoke_free",
        Fog: "cloud",
    };
    return icons[condition] || "help_outline";
}

// Event Listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
    cityInput.value = "";
});
