var userCurrentCity, cityName;

const defaultCityName = "Islamabad";
var city = document.getElementById("city");
var temperature = document.getElementById("degree-centigrade");
var humidityPercent = document.getElementById("humidity-percentage");
var pressurePercent = document.getElementById("pressure-percentage");
var searchBtn = document.getElementById("Search-btn");

getUserLocation();
getWeatherData();

//fetch and display the weather using API
function getWeatherData() {
  if (userCurrentCity != null) cityName = userCurrentCity;
  else cityName = defaultCityName; //default city Name;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

  fetch(url)
    .then((data) => {
      return data.json();
    })

    .then((data) => {
      if (data.cod == 200) {
        city.innerText = cityName;
        temperature.innerText = data.main.temp + "C";
        humidityPercent.innerText = data.main.humidity + "%";
        pressurePercent.innerText = data.main.pressure + "%";
      } else {
        alert("Error: City not found", data.message);
      }
    })
    .catch((err) => {
      console.log("Error found", err);
    });
}
// get the user current city
function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        fetch(apiUrl)
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            //console.log(data.address.suburb);
            userCurrentCity = data.address.city;
          });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }
}

//search the city ,given by user
function SearchCity() {
  var userSearchCity = document.getElementById("Search-input").value;
  userCurrentCity = userSearchCity;
  getWeatherData();
}
searchBtn.addEventListener("click", SearchCity);
