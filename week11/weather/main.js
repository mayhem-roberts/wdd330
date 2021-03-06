const APIKEY = `22b3edccab117440bdc47835f3f06a5e`;
const URL = `https://api.openweathermap.org/data/2.5/forecast?APPID=${APIKEY}&units=imperial`;

class App {
    constructor(element) {
        this.locations = [];
        this.element = element;
        this.display();
    }
    addLocation(l) {
        this.locations.push(l);
        this.display();
        this.saveLocation();
        console.log(this.locations);
    }
    deleteLocation(l) {
        const index = this.locations.findIndex(location => location.name === l.name);
        console.log(index);
        this.locations.splice(index, 1);
    }
    display() {
        this.element.innerHTML = ""; // clears html each time a new location is added so the list doesn't keep stacking 
        
        //console.log(this.locations)
        this.locations.forEach(l => l.display(this.element)) // goes through each list item 
    }
    saveLocation() {
        //localStorage.setItem("locations", JSON.stringify(newLocation));
    }
}

class Forecast {
    constructor(name, app) {
        this.name = name;
        this.app = app;
    }
    async getForecast() {
        const data = await fetch(`${URL}&q=${this.name}`)
        .then((response) => response.json())
        // console log json data
        console.log(data);
        return data;
    }
    async display(container) {
        const data = await this.getForecast();

        const forecast = data.list.filter(x => x.dt_txt.includes('18:00:00'));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const forecastStn = document.createElement("section");
        forecastStn.className = "forecast-stn"
        forecastStn.innerHTML = 
        `
        <div class="location-name">${data.city.name}, ${data.city.country}</div>
        `
        for (let i = 0; i < forecast.length; i++) {
            let date = new Date(forecast[i].dt_txt);
            console.log(date);

            const forecastCtr = document.createElement("div");
            forecastCtr.className = "forecast-ctr"
            forecastCtr.innerHTML = 
            `
            <div class="day">${days[date.getDay()]}</div>
            <div class="temp">${data.list[i].main.temp}&deg F</div>
            `
            container.appendChild(forecastStn);
            forecastStn.appendChild(forecastCtr);
        }
    }
}


const submitBtn = document.querySelector(".submitBtn");
const input = document.querySelector(".input");

const app = new App(document.querySelector(".weather-container"));

submitBtn.addEventListener("click", () => {
    // stop form from submitting
    event.preventDefault();
    const location = new Forecast(input.value, app);
    app.addLocation(location);
    input.value = "";
})