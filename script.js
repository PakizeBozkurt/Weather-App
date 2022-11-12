const express = require("express");
const https = require("https");

const script = express();

script.get("/", function (req, res) {

  const query = "London";
  const apiKey = "e72ca729af228beabd5d20e3b7749713";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDesc +"</p>");
      res.write("<h1>The temprature in London is " + temp + "degrees Celcius.</h1>")
      res.write("<img src=" + imageURL + "/>")
      res.send()
    });
  });
});

script.listen(3000, function () {
  console.log("Server is running on port 3000");
});
// window.addEventListener("load", () => {
//   let long;
//   let lat;
//   let tempDescrp = document.querySelector(".temperature-description");
//   let tempDegree = document.querySelector(".temperature-degree");
//   let locationTimezone = document.querySelector(".location-timezone");
//   let tempratureSection = document.querySelector(".temperature");
//   const temperatureSpan = document.querySelector(".temperature span");

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log(position);
//       long = position.coords.longitude;
//       lat = position.coords.latitude;

//       const proxy = `https://cors-anywhere.herokuapp.com/`;
//       const api = `${proxy}https://api.darksky.net/forecast/1dda89e902ce89b77ed2412eac3026d7/${lat},${long}`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           const { temprature, summary, icon } = data.currently;
//           //Set DOM Elements from the API
//           tempDegree.textContent = temprature;
//           tempDescrp.textContent = summary;
//           locationTimezone.textContent = data.timezone;
//           //Formula for Celsius
//           let celcius = (temprature - 32) * (5 / 9);

//           //Set Icon
//           setIcons(icon, document.querySelector(".icon"));
//           // Change temprature to Celsius/Fahrenheit
//           tempratureSection.addEventListener("click", () => {
//             if (temperatureSpan.textContent === "F") {
//               temperatureSpan.textContent = "C";
//               tempDegree.textContent = Math.floor(celcius);
//             } else {
//               temperatureSpan.textContent = "F";
//               tempDegree.textContent = temprature;
//             }
//           });
//         });
//     });
//   }
//   function setIcons(icon, iconID) {
//     const skycons = new Skycons({ color: "white" });
//     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//     skycons.play();
//     return skycons.set(iconID, Skycons[currentIcon]);
//   }
// });
