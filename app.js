const express = require("express");
const https =require("https");


const bodyParser=require("body-parser");


const app =express();


app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",function (req,res){
       res.sendFile(__dirname+ "/index.html");
})
app.post("/",function (req,res){
  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=5c03eb89f78cad940e51952b57a78966&units=metric";
  https.get(url,function (response){
    console.log(response.statusCode);
    if(response.statusCode==200){
    response.on("data",function(data){
      const Weatherdata=JSON.parse(data);
      const temp=Weatherdata.main.temp;
      const weatherdecription= Weatherdata.weather[0].description;
      const icon= Weatherdata.weather[0].icon;
      const imageurl= "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<p>The weather is currently "+weatherdecription+"  in  "+query+"</p>");
      res.write("<h1>The temperature in " +query+ " is " + temp + "</h1>");
      res.write("<img src= " + imageurl + ">");
      res.send();
    })}
    else{
       res.sendFile(__dirname+"/failure.html");
    }
  });
});


app.listen(process.env.PORT|| 3000,function()
{
  console.log("server is working Properly :)");
});
