
//Esconder las opciones del hamburger menu al presionar:
document.getElementById("hamburger").addEventListener("click", function(){
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("activate");
});

const selectCity = document.getElementById("citySelected");

selectCity.addEventListener("change", () => {
    const selectedOption = selectCity.options[selectCity.selectedIndex];

    const lat = selectedOption.dataset.lat;
    const lon = selectedOption.dataset.lon;

    if (!lat || !lon) return;

    const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;
    

    fetch(url)
        .then(response => response.json())
        .then(data => showWeather(data))
        .catch(error => console.error("Error fetching weather:", error));
});


function showWeather(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Tomar 1 dato cada 8 registros (8 * 3h = 24h)
    const dailyForecast = data.dataseries
        .filter((_, index) => index % 8 === 0)
        .slice(0, 7);

    dailyForecast.forEach((day, index) => {
        const div = document.createElement("div");
        div.classList.add("weather-card");

        div.innerHTML = `
            <h3>Día ${index + 1}</h3>
            <p>Temperatura: ${day.temp2m}°C</p>
            <p>Clima: ${day.weather}</p>
            <p>Humedad: ${day.rh2m}</p>
            <p>Viento: ${day.wind10m.direction} ${day.wind10m.speed} m/s</p>
            <hr>
        `;

        resultDiv.appendChild(div);
    });
}








