import orderDay from "./utilities/timeManage.js";
console.log(orderDay);

const APIKEY = "bb306b594037526c3aa72cdd4486b9b5";
let apiResults;
const description = document.querySelector(".description");
const degree = document.querySelector(".degree");
const city = document.querySelector(".city");
const hourText = document.querySelectorAll(".hour-text");
const hourDegree = document.querySelectorAll(".hour-degree");
const dayText = document.querySelectorAll(".day-text");
const dayDegree = document.querySelectorAll(".day-degree");
const imgIcone = document.querySelector(".icone-weather");
const loadingBox = document.querySelector(".overlay-loading-icon");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      CallAPI(longitude, latitude);
    },
    () => {
      alert(`You have to share your position`);
    }
  );
}

let CallAPI = (longitude, latitude) => {
  //   console.log(longitude, latitude);
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=
${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=en&appid=${APIKEY}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      apiResults = data;
      console.log(apiResults);
      description.innerText = apiResults.current.weather[0].description;
      degree.innerText = `${Math.trunc(apiResults.current.temp)}°`;
      city.innerText = apiResults.timezone;

      // heures dynamiques

      let timeNow = new Date().getHours();

      for (let i = 0; i < hourText.length; i++) {
        let nextHour = timeNow + i * 3;

        if (nextHour > 24) {
          hourText[i].innerText = `${nextHour - 24}h`;
        } else if (nextHour === 24) {
          hourText[i].innerText = `00h`;
        } else {
          hourText[i].innerText = `${nextHour}h`;
        }
      }

      // degree heure dynamique

      for (let i = 0; i < hourDegree.length; i++) {
        hourDegree[i].innerText = `${Math.trunc(
          apiResults.hourly[i * 3].temp
        )}°`;
      }

      // jour dynamique

      for (let i = 0; i < orderDay.length; i++) {
        dayText[i].innerText = orderDay[i].slice(0, 3);
      }

      // degree jour dynamique

      for (let i = 0; i < dayDegree.length; i++) {
        dayDegree[i].innerText = `${Math.trunc(apiResults.daily[i].temp.day)}°`;
      }

      // Icone dynamique

      if (timeNow > 6 && timeNow < 21) {
        imgIcone.src = `./ressources/day/${apiResults.current.weather[0].icon}.svg`;
      } else {
        imgIcone.src = `./ressources/night/${apiResults.current.weather[0].icon}.svg`;
      }

      loadingBox.classList.add("disappear");
    });
};
