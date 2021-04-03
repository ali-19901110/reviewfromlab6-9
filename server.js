'use strict'

//my dependencies
const express =require('express');
const cors    =require('cors');
const { response, request } = require('express');
const PORT =3000;
//call express
const app =express();


//for use cors
app.use(cors());

//crate a get route for location
function Location(search_query,formatted_query,latitude,longitude){
    this.search_query=search_query,
    this.formatted_query=formatted_query,
    this.latitude=latitude,
    this.longitude=longitude
}

app.get('/location',handelLocation);

function handelLocation(request,response){
    const getLocation=require('./data/location.json');
    const newLocation =request.query;
    //console.log(getLocation[0]);
    // console.log(request.query.search_query);
    const city =request.query.city;
    //console.log(city)
  let  search_query=city;
   let  formatted_query=getLocation[0].display_name;
   let  latitude =getLocation[0].lat;
   let  longitude=getLocation[0].lon;
    let newobj =new Location(search_query,formatted_query,latitude,longitude)
response.send(newobj); 
}

function Weathercity(time, description) {
    this.time = time,
    this.description = description
}

app.get('/weather',handelWeather)

function handelWeather(req,res){
    const weath =require('./data/weather.json');
    let newWeath =weath.data;
 //  console.log(newWeath);
 
  let resweth =[];
let weather={};
   newWeath.forEach(item=>{
    // weather = new Weathercity(item.datetime,item.weather.description);
   // resweth.push({'forecast': item.weather.description,'time': item.datetime })
    //    console.log(item.weather.description)
    //    console.log(item.datetime)
   // resweth.push(item.weather.description,item.datetime);
     resweth.push({"forecast": item.weather.description, "time": item.datetime});
    //  neobj =new Weather(item.weather.description,item.datetime)
    //  console.log(neobj)
   // console.log(weather);
   })
 // console.log(resweth);

//   console.log(neobj);
   res.send(resweth); 
}

app.listen(PORT,()=>console.log(`App is running ${PORT}`));