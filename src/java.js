function formatDate (timestamp) {
    let date = new Date (timestamp)
    let hours = date.getHours(); 
    let minutes = date.getMinutes(); 
    if (hours <10) {
        hours = `0${hours}`
    }; 
    if (minutes <10) {
        minutes = `0${minutes}`
    }; 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday" , "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
};


function displayTemperature(response) {
    celTemp = response.data.main.temp;
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")
    celTemp = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celTemp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather.description;  
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
}

function search(city) {
    let apiKey ="bdf4089b0994f94adcf10ec4fb943bff";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);

};
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value)
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahTemp(event) {
    event.preventDefault();
    let fahTemperature = (celTemp * 9)/5 + 32; 
    celTemperature.classList.remove("active");
    fahTemperature.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahTemperature);
};
function displayCelTemp(event) {
    event.preventDefault();
    celTemperature.classList.add("active");
    fahTemperature.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celTemp);
};
let fahTemperature= document.querySelector("#Fdegree")
fahTemperature.addEventListener("click", displayFahTemp)
let celTemperature= document.querySelector("#Cdegree")
celTemperature.addEventListener("click", displayCelTemp)
let celTemp = null;
search("Ha noi");