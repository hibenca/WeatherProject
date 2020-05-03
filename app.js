const express = require("express");
const http = require("https");

const app = express();

app.get("/", function (req, res) {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=imperial&APPID=bcb0bf27f7e2c63d6dd8bd94b5a3154c";

  http.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weather = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The temperature in Minneapolis is " + temp + " degrees</p>")
      res.write("<p>The weather is currently " + weather + "</p>")
      res.write("<img src=" + imageURL +">")
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})
