const apiKey = "6dd87fb3c3685cd984725725ea361058";
let cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchButton")
var bee = cityInput.value


function getGeoDetails() {
    let cityName = cityInput.value.trim();
    if(!cityName) return;
    const geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    fetch(geo_url)
        .then(response => response.json())
        .then(data => {
            let {lat, lon} = data[0];
            getAirPoll(lat, lon);
        }).catch(() => {
            alert("Failed to connect, try again.")
        });
}
function getAirPoll(lat, lon) {
    const air_poll_url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(air_poll_url)
        .then(response => response.json())
        .then(data => {
            let airQuali = (data.list[0].main.aqi)
        document.getElementById("air_quali_index").innerHTML = airQuali
    cityInput.value = ``
        })
}



searchBtn.addEventListener("click", function() {
    getGeoDetails()
});

