/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/
// 
let popupModal = document.querySelector('.modal');
let closeBtn = document.querySelector('#close-btn');
var body = document.getElementById('cityButtons');
// Create div element
var infoEl = document.createElement("div");
// Create ordered list element
var listEl = document.createElement("ol");

// function that takes everything from local storage and put it in the 'values' array
function allStorage() {
  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
  }
  return values;
}
console.log("allStorage(): ", allStorage());

//for loop that cycles through the local storage values and creates a search history button for each value
for (let i = 0; i < allStorage().length; i++) {
  var citySearchBtn = document.createElement("button")
  var li1 = document.createElement("li");

  console.log("allStorage()[i]: ", allStorage()[i])
  
  citySearchBtn.textContent = allStorage()[i]
  citySearchBtn.setAttribute("style", "background:gray")
  citySearchBtn.value = allStorage()[i]
  body.appendChild(infoEl)
  infoEl.appendChild(listEl)
  listEl.appendChild(li1)
  li1.appendChild(citySearchBtn)

  citySearchBtn.addEventListener('click', function(event) {
    getWeather(event.target.value)
  })
}

//eventlistener that takes in user input after they click the search button
//if the search filed is empty they get a modal popup asking for a city
searchBtn.addEventListener('click', function() {
    let citySearch = document.querySelector('#city-search').value
    
    localStorage.setItem(citySearch, citySearch)

    if (citySearch) {
        citySearch = citySearch.toLowerCase().replace(/ /g, '');
    } else {
      popupModal.style.display='block';
    }
    getWeather(citySearch)
    console.log("citySearch: ", citySearch);
})

// this allows then user to close the popup modal
closeBtn.addEventListener('click', function() {
  popupModal.style.display = 'none';
});

//function that gets the current weather & the 5 day weather
function getWeather(citySearch) {
  let api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&exclude=hourly,daily&units=imperial&appid=f4eb3b5a80a206fa93f14a43ce8ac929`;
    console.log();

    fetch(api_url)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function(cityLocation) {
        let cityLat = cityLocation.city.coord.lat
        let cityLong = cityLocation.city.coord.lon
        let weatherIcon = cityLocation.list[0].weather[0].icon
        console.log("weatherIcon: ", weatherIcon);
        let icon_url = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
        console.log("icon_url: ", icon_url);
        let todaysDate = moment().format("(M/D/YYYY)");
        let day1 = moment().add(1, 'days').format("M/D/YYYY");
        let day2 = moment().add(2, 'days').format("M/D/YYYY");
        let day3 = moment().add(3, 'days').format("M/D/YYYY");
        let day4 = moment().add(4, 'days').format("M/D/YYYY");
        let day5 = moment().add(5, 'days').format("M/D/YYYY");
        //single day weather header, include city name, todays date & a weather icon
        results.innerHTML = `${citySearch} ${todaysDate} <img src="${icon_url}" class ="iconclass" alt="weather icon">`

        //5 day header
        forecast.innerHTML = `5-Day Forecast:`
        //day 1 of 5 day forecast, includes date, icon, temp, wind & humidity
        dayonedate.innerHTML = `${day1}`
        dayoneicon.innerHTML = `<img src="${icon_url}" class ="iconclass" alt="weather icon">`
        dayonetemp.innerHTML = `Temp: ${cityLocation.list[0].main.temp} °F`
        dayonewind.innerHTML = `Wind: ${cityLocation.list[0].wind.speed} MPH`
        dayonehumidity.innerHTML = `Humidity: ${cityLocation.list[0].main.humidity} %`

        document.getElementById("dayone").style.borderStyle = "solid"
        document.getElementById("dayone").style.borderWidth = "1px"
        document.getElementById("dayone").style.margin = "10px"
        document.getElementById("dayone").style.width = "fit-content"
        document.getElementById("dayone").style.backgroundColor = "rgb(45, 61, 72)"
        document.getElementById("dayone").style.color = "white"

        //day 2 of 5 day forecase
        daytwodate.innerHTML = `${day2}`
        daytwoicon.innerHTML = `<img src="${icon_url}" class ="iconclass" alt="weather icon">`
        daytwotemp.innerHTML = `Temp: ${cityLocation.list[8].main.temp} °F`
        daytwowind.innerHTML = `Wind: ${cityLocation.list[8].wind.speed} MPH`
        daytwohumidity.innerHTML = `Humidity: ${cityLocation.list[8].main.humidity} %`

        document.getElementById("daytwo").style.borderStyle = "solid"
        document.getElementById("daytwo").style.borderWidth = "1px"
        document.getElementById("daytwo").style.margin = "10px"
        document.getElementById("daytwo").style.width = "fit-content"
        document.getElementById("daytwo").style.backgroundColor = "rgb(45, 61, 72)"
        document.getElementById("daytwo").style.color = "white"

        //day 3 of 5 day forecase
        daythreedate.innerHTML = `${day3}`
        daythreeicon.innerHTML = `<img src="${icon_url}" class ="iconclass" alt="weather icon">`
        daythreetemp.innerHTML = `Temp: ${cityLocation.list[16].main.temp} °F`
        daythreewind.innerHTML = `Wind: ${cityLocation.list[16].wind.speed} MPH`
        daythreehumidity.innerHTML = `Humidity: ${cityLocation.list[16].main.humidity} %`

        document.getElementById("daythree").style.borderStyle = "solid"
        document.getElementById("daythree").style.borderWidth = "1px"
        document.getElementById("daythree").style.margin = "10px"
        document.getElementById("daythree").style.width = "fit-content"
        document.getElementById("daythree").style.backgroundColor = "rgb(45, 61, 72)"
        document.getElementById("daythree").style.color = "white"

        //day 4 of 5 day forecase
        dayfourdate.innerHTML = `${day4}`
        dayfouricon.innerHTML = `<img src="${icon_url}" class ="iconclass" alt="weather icon">`
        dayfourtemp.innerHTML = `Temp: ${cityLocation.list[24].main.temp} °F`
        dayfourwind.innerHTML = `Wind: ${cityLocation.list[24].wind.speed} MPH`
        dayfourhumidity.innerHTML = `Humidity: ${cityLocation.list[24].main.humidity} %`

        document.getElementById("dayfour").style.borderStyle = "solid"
        document.getElementById("dayfour").style.borderWidth = "1px"
        document.getElementById("dayfour").style.margin = "10px"
        document.getElementById("dayfour").style.width = "fit-content"
        document.getElementById("dayfour").style.backgroundColor = "rgb(45, 61, 72)"
        document.getElementById("dayfour").style.color = "white"

        //day 5 of 5 day forecase
        dayfivedate.innerHTML = `${day5}`
        dayfiveicon.innerHTML = `<img src="${icon_url}" class ="iconclass" alt="weather icon">`
        dayfivetemp.innerHTML = `Temp: ${cityLocation.list[32].main.temp} °F`
        dayfivewind.innerHTML = `Wind: ${cityLocation.list[32].wind.speed} MPH`
        dayfivehumidity.innerHTML = `Humidity: ${cityLocation.list[32].main.humidity} %`

        document.getElementById("dayfive").style.borderStyle = "solid"
        document.getElementById("dayfive").style.borderWidth = "1px"
        document.getElementById("dayfive").style.margin = "10px"
        document.getElementById("dayfive").style.width = "fit-content"
        document.getElementById("dayfive").style.backgroundColor = "rgb(45, 61, 72)"
        document.getElementById("dayfive").style.color = "white"

        console.log("cityLocation: ", cityLocation);


        let api_url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&exclude=hourly,minutely&units=imperial&appid=f4eb3b5a80a206fa93f14a43ce8ac929`
        console.log("api_url2: ", api_url2);

        fetch(api_url2)
        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }
          return response.json();
        })
        .then(function(weatherData) {
          console.log("weatherData: ", weatherData);
          temp.innerHTML = `Temp: ${weatherData.current.temp} °F`
          wind.innerHTML = `Wind: ${weatherData.current.wind_speed} MPH`
          humidity.innerHTML = `Humidity: ${weatherData.current.humidity} %`
          uvIndex = weatherData.current.uvi
            if (uvIndex < 3) {
              uvi.innerHTML = `UV Index: ${weatherData.current.uvi}`
              uvi.style.backgroundColor = 'rgb(0, 255, 0)';
            } else if (uvIndex >= 3 && uvIndex < 6) {
              uvi.innerHTML = `UV Index: ${weatherData.current.uvi}`
              uvi.style.backgroundColor = 'rgb(255, 255, 0)';
            } else if (uvIndex >= 6 && uvIndex < 8) {
              uvi.innerHTML = `UV Index: ${weatherData.current.uvi}`
              uvi.style.backgroundColor = 'rgb(255, 165, 0)';
            } else if (uvIndex >= 8 && uvIndex < 11) {
              uvi.innerHTML = `UV Index: ${weatherData.current.uvi}`
              uvi.style.backgroundColor = 'rgb(255, 0, 0)';
            } else {
              uvi.innerHTML = `UV Index: ${weatherData.current.uvi}`
              uvi.style.backgroundColor = 'rgb(128,0,128)';
            }
          document.getElementById("singleDay").style.borderStyle = "solid"
          document.getElementById("singleDay").style.borderWidth = "1px"
          document.getElementById("singleDay").style.margin = "10px"
          return console.log("yay");
        })
    })
}


