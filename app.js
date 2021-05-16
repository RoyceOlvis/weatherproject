
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request,response){

     const query = request.body.cityName;
     const apiKey = "440bda6e65b6862aae95554bc9314c35";
     const unit = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
     //console.log(query);
     https.get(url, function(res){
     console.log(res.statusCode);

     res.on("data", function(data){
       const weatherData = JSON.parse(data);
       console.log(weatherData);
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       response.write("<p>The weather is currently "  + weatherDescription + "</p>");
       response.write("<h1>The Temprature in " + query +" is " + temp + "degrees Celcius</hi>");
       response.write("<img src=" + imageURL +">");
       response.send()
     })
     })

})




app.listen(3000, function(){
  console.log("Server is running on port 3000")
});
