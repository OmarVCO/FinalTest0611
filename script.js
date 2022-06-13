const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = 'b6c70cdd78857c3fb5f31b62cfb5d8b0';


setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


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
    let {icon,description} =  data.current.weather[0];
    console.log(sunrise,sunset,humidity,pressure,temp,wind_speed,icon);

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + ' N ' + data.lon+'E';
   

    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>`;

    //${window.moment(sunrise * 1000).format('HH:mm a')}

  let otherDayForcast = ''
  data.daily.forEach((day, idx) => {
    if(idx == 0) {
    currentTempEl.innerHTML = `
    <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
    <div class="other">
        <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
        <div class="temp">Night - ${day.temp.night}&#176;C</div>
        <div class="temp">Day - ${day.temp.day}&#176;C</div>
    </div>
    `

    }else {
      otherDayForcast += `
      <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176; C</div>
        <div class="temp">Day - ${day.temp.day}&#176; C</div>
      </div>

      `
    }
  })

  weatherForecastEl.innerHTML = otherDayForcast;

}


// let weather = {
//     apiKey: "b6c70cdd78857c3fb5f31b62cfb5d8b0",
//     fetchWeather: function () {
//       fetch(
//         "https://api.openweathermap.org/data/2.5/forecast?lat=49.19817697810642&lon=-123.0230679546923&cnt=5&units=metric&appid=b6c70cdd78857c3fb5f31b62cfb5d8b0"
//       ).then((response) => response.json())
//        .then((data) => this.displayWeather(data));
//     },

//     displayWeather: function (data) {
//       const { name } = data.city;
//       const { icon, description } = data.list[0].weather[0];
//       const { temp, humidity } = data.list[0].main;
//       const { speed } = data.list[0].wind;
//       console.log(name,icon,description,temp,humidity,speed);

//       document.querySelector(".city").innerText = "Weather in " + name;
//       document.querySelector(".icon").src =
//         "https://openweathermap.org/img/wn/" + icon + ".png";
//       document.querySelector(".description").innerText = description;
//       document.querySelector(".temp").innerText = temp + "°C";
//       document.querySelector(".humidity").innerText =
//         "Humidity: " + humidity + "%";
//       document.querySelector(".wind").innerText =
//         "Wind speed: " + speed + " km/h";
//       document.querySelector(".weather").classList.remove("loading");
//       document.body.style.backgroundImage =
//         "url('https://source.unsplash.com/1600x900/?" + name + "')";
//     },

//     search: function () {
//       this.fetchWeather(document.querySelector(".search-bar").value);
//     },
//   };
  
//   document.querySelector(".search button").addEventListener("click", function () {
//     weather.search();
//   });
  
//   document
//     .querySelector(".search-bar")
//     .addEventListener("keyup", function (event) {
//       if (event.key == "Enter") {
//         weather.search();
//       }
//     });
  

//     // weather.fetchWeather("Vancouver");
    