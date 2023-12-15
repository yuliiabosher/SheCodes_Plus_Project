function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img class="weather-app-icon" src="${response.data.condition.icon_url}" />`;
  getForecast(response.data.city);
}
function searchCity(city) {
  let apiKey = "faatffb82d47ao51d03b638324ded3df";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Kyiv");

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";
  let forecastElement = document.querySelector("#forecast");
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDate(day.time)}</div>
              <img
                src="${day.condition.icon_url}"/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "faatffb82d47ao51d03b638324ded3df";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiURL).then(displayForecast);
}
