const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");
  });

  app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "1bdb57b06bc57a37ef5c6163598f2ca1";
    const unit = "metric";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      apiKey +
      "&units=" +
      unit;
      
    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently " + weatherDesc + "</p>");
        res.write(
          "<h1>The temprature in " + query + " is " + temp + "degrees Celcius.</h1>"
        );
        res.write("<img src=" + imageURL + "/>");
        res.send();
      });
    });
  })

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
