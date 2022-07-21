// -------------------------------- Selectors --------------------------------
const submitButton = document.querySelector(".submitButton");

//--------------------------------- Listeners -------------------------------

// fetch weather location
submitButton.addEventListener("click", function() {
    // stop form from submitting
    event.preventDefault();

    var location = document.querySelector(".input");
    const APIKEY = "22b3edccab117440bdc47835f3f06a5e";
    var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location.value}&APPID=${APIKEY}&units=imperial`;

    fetch(URL)
    .then((response) => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Not a location"))
});

if(localStorage.getItem("locations") === null) {
    this.locations;
}else {
    this.locations = JSON.parse(localStorage.getItem("locations"));
}

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

        this.list = data.list;
        return this.list;
    }
    async display(container) {
        const list = await this.getForecast()

        const forecastCtr = document.createElement("div");
        forecastCtr.className = "forecast-ctr"
        forecastCtr.innerHTML = 
        `<span class="temp">${list[0].main.temp}&deg F<span>
         <span class="location-name">${this.name}<span>
         <button class="delete">x</button>
        `
        container.appendChild(forecastCtr);
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