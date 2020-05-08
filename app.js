const express = require("express");
const http = require("https");
const bodyParser = require("body-Parser");
require('dotenv').config();

console.log(process.env);

const app = express();

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html")
  });

  app.post("/", function (req, res) {

    const apiKey = process.env.API_KEY;
    const query = req.body.CityName;
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&APPID=" + apiKey;

  http.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weather = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The temperature in " + query + " is " + temp + " degrees</p>")
      res.write("<p>The weather is currently " + weather + "</p>")
      res.write("<img src=" + imageURL +">")
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})
