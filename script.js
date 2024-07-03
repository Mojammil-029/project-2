const apiKey = "59315c696f1a67421bce22654836c1f3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function setDate(element) {
    let myDate = new Date(); // Creating a Date object for the current date
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let formattedDate = myDate.toLocaleDateString('en-GB', options);
    element.innerHTML = formattedDate;
}

async function checkWeather(city, targetDiv) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
console.log(data);
    if (response.status == 404) {
        targetDiv.querySelector(".error").style.display = "block";
        targetDiv.querySelector(".weather").style.display = "none";
    } else {
        targetDiv.querySelector(".city").innerHTML = data.name;
        targetDiv.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        targetDiv.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        targetDiv.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";
        targetDiv.querySelector(".weather-info").innerHTML = data.weather[0].main;

        let weatherIcon = targetDiv.querySelector(".weather-icon");
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Dizzle":
                weatherIcon.src = "images/dizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
        }
        targetDiv.querySelector(".weather").style.display = "block";
        targetDiv.querySelector(".error").style.display = "none";
    }
}

document.querySelectorAll('.card').forEach(card => {
    let dateElement = card.querySelector(".date");
    setDate(dateElement);

    let searchBox = card.querySelector(".search input");
    let searchBtn = card.querySelector(".search button");

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value, card);
    });

    document.addEventListener("keypress", (event) => {
        let key = event.key;
        if (key === 'Enter') {
            checkWeather(searchBox.value, card);
        }
    });
});
