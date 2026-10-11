const API_KEY = "5fb914310eaa9a0bb5d0c41e26ef4034";

const cityInput = document.getElementById("cityInput");

const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const weatherResult = document.getElementById("weatherResult");


// Function to get weather
async function getWeather() {

    const city = cityInput.value.trim();


    // Check if city is empty
    if (city === "") {

        message.textContent = "Please enter a city name.";

        weatherResult.innerHTML = "";

        return;
    }


    message.textContent = "Loading weather information...";

    weatherResult.innerHTML = "";


    try {

        // OpenWeather Current Weather API
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        // Fetch data from API
        const response = await fetch(url);


        // Check if API request was successful
        if (!response.ok) {

            if (response.status === 404) {

                throw new Error("City not found.");

            }

            if (response.status === 401) {

                throw new Error(
                    "Invalid API key. Check your OpenWeather API key."
                );

            }

            throw new Error(
                "Unable to fetch weather information."
            );
        }


        // Convert response into JSON
        const data = await response.json();


        // Display weather
        displayWeather(data);


        message.textContent = "";

    }

    catch (error) {

        message.textContent = error.message;

        message.className = "error";

        weatherResult.innerHTML = "";

        console.error(error);

    }

}


// Function to display weather
function displayWeather(data) {

    const cityName = data.name;

    const country = data.sys.country;

    const temperature = data.main.temp;

    const feelsLike = data.main.feels_like;

    const humidity = data.main.humidity;

    const pressure = data.main.pressure;

    const windSpeed = data.wind.speed;

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;


    // OpenWeather icon URL
    const iconURL =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;


    weatherResult.innerHTML = `

        <div class="weather-card">

            <h2>${cityName}</h2>

            <p class="country">
                ${country}
            </p>


            <img
                src="${iconURL}"
                alt="${description}"
                class="weather-icon"
            >


            <div class="temperature">
                ${Math.round(temperature)}°C
            </div>


            <p class="description">
                ${description}
            </p>


            <div class="weather-details">

                <div class="detail">
                    🌡️ Feels Like
                    <br>
                    <strong>${Math.round(feelsLike)}°C</strong>
                </div>


                <div class="detail">
                    💧 Humidity
                    <br>
                    <strong>${humidity}%</strong>
                </div>


                <div class="detail">
                    💨 Wind Speed
                    <br>
                    <strong>${windSpeed} m/s</strong>
                </div>


                <div class="detail">
                    🌡️ Pressure
                    <br>
                    <strong>${pressure} hPa</strong>
                </div>

            </div>

        </div>
    `;
}


// Search button
searchButton.addEventListener(
    "click",
    getWeather
);


// Press Enter to search
cityInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);