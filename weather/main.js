const APIKEY = `22b3edccab117440bdc47835f3f06a5e`;
const URL = `https://api.openweathermap.org/data/2.5/forecast?APPID=${APIKEY}&units=imperial`;

class Constructor {
    constructor(element) {
        this.locations = [];
        this.element = element; // main-container
        this.display();
    }
    addLocation(l) {
        this.locations.push(l);
        //console.log(l);
        this.display();
        this.saveLocation(l);
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
    saveLocation(l) {
        console.log(l);
        //const newLocation = {name: l}
        //localStorage.setItem("locations", JSON.stringify(newLocation));
    }
}

class Forecast {
    constructor(name, con) {
        this.name = name;
        this.com = con;
    }
    async getForecast() {
        const data = await fetch(`${URL}&q=${this.name}`)
        .then((response) => response.json())
        // console log json data
        console.log(data);
        return data;
    }
    async display(container) {
        const data = await this.getForecast(); // forcast JSON data
        console.log(data);
        const forecast = data.list.filter(x => x.dt_txt.includes('18:00:00')); // get the forcast for each day
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

        // create location-container div and append to main container
        const locationContainer = document.createElement("div");
        locationContainer.className = "location-container"
        container.appendChild(locationContainer);

        // create  div and append to main container
        const locationH2 = document.createElement("div"); 
        locationH2.className = ".location-h2"
        locationH2.innerHTML = 
        `
        <h2 class="location-name">${data.city.name}, ${data.city.country}</h2>
        `
        locationContainer.appendChild(locationH2);

        const fcContainer = document.createElement("div");
        fcContainer.className = "fc-container";
        locationContainer.appendChild(fcContainer);

        for (let i = 0; i < forecast.length; i++) {
            let date = new Date(forecast[i].dt_txt);
            //console.log(date);

            const dayDiv = document.createElement("div");
            dayDiv.className = "day-div"
            dayDiv.innerHTML = 
            `
            <span class="day day_${i+1}">${days[date.getDay()]}</span>
            <span class="temp temp_${i+1}">${forecast[i].main.temp.toFixed()}&deg F</span>
            <span class="description description_${i+1}">${forecast[i].weather[0].description}</span>
            `

            fcContainer.appendChild(dayDiv);
        }

    }
}

const submitBtn = document.querySelector(".submitBtn");
const input = document.querySelector(".input");

const con = new Constructor(document.querySelector(".main-container"));

submitBtn.addEventListener("click", (event) => {
    // stop form from submitting
    event.preventDefault();
    const location = new Forecast(input.value, con);
    con.addLocation(location);
    input.value = "";
})