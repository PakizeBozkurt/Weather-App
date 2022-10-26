window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescrp = document.querySelector(".temperature-description");
  let tempDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempratureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/1dda89e902ce89b77ed2412eac3026d7/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temprature, summary, icon } = data.currently;
          //Set DOM Elements from the API
          tempDegree.textContent = temprature;
          tempDescrp.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for Celsius
          let celcius = (temprature - 32) * (5 / 9);

          //Set Icon
          setIcons(icon, document.querySelector(".icon"));
          // Change temprature to Celsius/Fahrenheit
          tempratureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              tempDegree.textContent = temprature;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
