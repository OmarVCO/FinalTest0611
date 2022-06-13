// let latlong = {
//   apiKey: "b6c70cdd78857c3fb5f31b62cfb5d8b0",
//   fetchWeather: function () {
//     fetch( 
//       "http://api.openweathermap.org/geo/1.0/direct?q=Vancouver&limit=1&appid=" + this.apiKey
//     ).then((response) => response.json())
//     .then((data) => this.displayLatlong(data));
//   },
//   displayLatlong: function (data) {
//     const { lat } = data[0];
//     const { lon } = data[0];
//     console.log(lat,lon);
//   }
// }
const API_KEY = 'b6c70cdd78857c3fb5f31b62cfb5d8b0';

getWeatherData ()
function getWeatherData () {
navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let {latitude, longitude } = success.coords;
    console.log(latitude,longitude);

    fetch( `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&cnt=5&units=metric&appid=${API_KEY}`
    ).then(res => res.json()).then(data => {

      console.log(data);
      showWeatherData(data);
    })

})
}

function showWeatherData(data) {
  let {sunrise, sunset,temp, humidity,pressure,wind_speed} = data.current;
  let {icon} =  data.current.weather[0];
  console.log(sunrise,sunset,humidity,pressure,temp,wind_speed,icon);

  //${window.moment(sunrise * 1000).format('HH:mm a')}

}


// let otherDayForcast = ''
// data.daily.forEach(day, idx) =>  {
//   if(idx == 0) {

//   }else {
//     otherDayForcast +=`
//     <div class="weather-forecast" id="weather-forecast">
//     <div class="weather-forecast-hourly">
//       <div class="day">0 - 3</div>
//       <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
//       <div class="temp">Night - 25.6&#176; C</div>
//       <div class="temp">Day - 35.6&#176; C</div>
//     </div>
//     `
//   }
// }

let weather = {
    apiKey: "b6c70cdd78857c3fb5f31b62cfb5d8b0",
    fetchWeather: function () {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=49.19817697810642&lon=-123.0230679546923&cnt=5&units=metric&appid=b6c70cdd78857c3fb5f31b62cfb5d8b0"
      ).then((response) => response.json())
       .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
      const { name } = data.city;
      const { icon, description } = data.list[0].weather[0];
      const { temp, humidity } = data.list[0].main;
      const { speed } = data.list[0].wind;
      console.log(name,icon,description,temp,humidity,speed);

      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
    weather.fetchWeather("Vancouver");
    