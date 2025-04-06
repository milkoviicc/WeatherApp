let weather = {
    "apiKey": "ef1b7a53e132066c6f3ba367f588e35f",
    fetchWeather: function(city) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText = "Humidity: " + humidity + "%";
        document.querySelector('.wind').innerText = "Wind speed: " + speed + "km/h";
        document.querySelector('.weather').classList.remove('loading');

        fetch("https://api.unsplash.com/photos/random?query=" + name + "&orientation=landscape&count=1&client_id=v2CQ_R6yKXSAeH9xfqjxYa4pJQrgAvXzIAfDdBmBFwg").then((response) => response.json()).then((data) => {
            const imageUrl = data[0].urls.full;
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
        });
    },
    search: function() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
}; 

document.querySelector('.search button').addEventListener("click", function() {
    weather.search();
});

document.querySelector('.search-bar').addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Grad Zagreb, HR");
