//Major project --> Tilte - Smart Bot <--
var express = require('express');
const  {Router, Extra, memorySession} = require('telegraf') 
const Markup = require('markup')
const Telegraf = require('telegraf')
const app = new Telegraf("371107155:AAFxgTSa0QDHwYNFywr43MpKEl6dpWqY7ck")
const imdb = require('imdb-api');
var Q = require('q');
var request = Q.denodeify(require("request"));

app.command('start', (ctx) => {
  ctx.reply("Welcome "+ctx.chat.first_name+"!")
  console.log(ctx.chat.location)
  console.log("li")
  return ctx.reply('Options',mainMenu)  
})

const mainMenu = Telegraf.Extra
  //.markdown()
  .markup((m) => m.keyboard([
    ['Weather','News'],
    ['Movie Rating',' Get to know us']
  ]))

        app.hears('Get to know us', (ctx) => {
          return ctx.reply('Options',ourMenu) 
            })

                const ourMenu = Telegraf.Extra
                  .HTML()
                  .markdown()
                  .markup((m) => m.keyboard([
                    ['Team Members','Roll Nos'],
                    ['Project Guide','My Details'],
                    ['Back']
                  ]))

                    app.hears('Team Members',(ctx) => {
                      return ctx.reply('Sumayyiah & Zahra') 
                    } )
                    app.hears('Roll Nos',(ctx) => {
                     return ctx.reply('160413737008 & 160413737071') 
                    } )
                    app.hears('Project Guide',(ctx) => {
                     return ctx.reply('Mr Pasha') 
                    } )
                   app.hears('My Details',(ctx) => {
                   return ctx.reply('...', Extra.markup((markup) => {
                   return markup.resize()
                  .keyboard([
                    markup.contactRequestButton('My contact'),
                    markup.locationRequestButton('My location')
                    ])
                   }))
                 })
    
                   app.hears('Back',(ctx) => {
                    return ctx.reply('Back',mainMenu) 
                  } )

app.hears('Weather',(ctx) =>{
  var message1 = "Welcome to your WeatherBot\n"
  message1 += "Get weather update by entering the name of a city."
  var fromId = ctx.from.id;// get the id, of who is sending the message 
  ctx.reply(message1);
  console.log(message1)
  app.on('text',ctx=>{
              var city = ctx.message.text
              console.log(city)
              getWeatherData(city)
             .then(function(data){
              var message1 = "Weather today in "+city+"\n";
              //message +=data.weather[2].main+"\n"
              message1+= "temp: "+(data.main.temp-273.15)+" Celsius"
              message1+= "\nhumidity: "+(data.main.humidity)+"%"
              message1+= "\nwind: "+(data.wind.speed)+" miles/hr"
              ctx.reply(message1);
              console.log(message1)
            });
        })
});

app.hears('Movie Rating',(ctx) =>{
  var message = "Welcome\n"
  message += "Get movie rating by entering the name of a movie."
  var fromId = ctx.from.id;// get the id, of who is sending the message 
  ctx.reply(message);
  console.log(message)
  app.on('text',ctx=>{
              var movie = ctx.message.text
              console.log(movie)
              getMovie(movie)
             .then(function(data){
              var message = "Rating of "+movie+"\n";
              //message +=data.weather[2].main+"\n"
              message+= "Title: "+(data.Title)
              message+= "\nYear: "+(data.Year)//+"%"
              message+= "\nGenre: "+(data.Genre)
              message+= "\n"+(data.Poster)
              message+= "\nRating: "+(data.Rating[1].Source)
              message+= "\t "+(data.Rating[1].Value)
              ctx.reply(message);
              console.log(message)
            });
        })
});


app.hears('News',(ctx) =>{
  var message = "Welcome to your NewsBot\n"
  message += "Get news update by selecting a news channel/paper."
  var fromId = ctx.from.id;// get the id, of who is sending the message 
    ctx.reply('Get news update by selecting a news channel/paper',newsMenu);
console.log(message)
 
// app.on('text',ctx=>{
//               var channel = ctx.message.text
//               console.log(channel)
//               getNews(channel)
//              .then(function(data){
//                 var i=1
//                  // while(i<=10){
//                     var message = "News in "+channel+"\n";
//                     //message +=data.weather[2].main+"\n"
//                     message+= "Headlines: "+(data.articles[1].title)
//                     message+= "Link: "+(data.articles[1].urlToImage)
//                     // message+= "Headlines: "+(data.articles[2].title)
//                     // message+= "Link: "+(data.articles[2].urlToImage)//+"%"
//                     ctx.reply(message);
//                     console.log(message)
//                  // }
//             });
//         })
     })   
  const newsMenu = Telegraf.Extra
                  .HTML()
                  .markdown()
                  .markup((m) => m.keyboard([
                    ['The Times of India','CNN'],
                    ['BBC news','BBC Sport'],
                    ['Tech Crunch','National Geographic']
                  ]))

// const defaultMarkup = Extra
//   .HTML()
//   .markup((m) => m.keyboard([
//     m.callbackButton('Next article', 'clothes')
//     ], {columns: 2}))

                


  app.hears('The Times of India',ctx=>{
              var channel = "The Times of India"
              console.log(channel)
              getNews(channel)
             .then(function(data){
                var i=1
                 // while(i<=10){
                    var message = "News in "+channel+"\n";
                    //message +=data.weather[2].main+"\n"
                    message+= "Headlines: "+(data.articles[1].title)
                    message+= "Link: "+(data.articles[1].urlToImage)
                    // message+= "Headlines: "+(data.articles[2].title)
                    // message+= "Link: "+(data.articles[2].urlToImage)//+"%"
                    ctx.reply(message);
                    console.log(message)
                 // }
            });
        })
 app.hears('BBC news',ctx=>{
              var channel = "BBC news"
              console.log(channel)
              getNews(channel)
             .then(function(data){
                var i=1
                 // while(i<=10){
                    var message = "News in "+channel+"\n";
                    //message +=data.weather[2].main+"\n"
                    message+= "Headlines: "+(data.articles[1].title)
                    message+= "Link: "+(data.articles[1].urlToImage)//+"%"
                    ctx.reply(message);
                    console.log(message)
                 // }
            });
        })


app.hears('CNN',ctx=>{
              var channel = "CNN"
              console.log(channel)
              getNews(channel)
             .then(function(data){
                var i=1
                 // while(i<=10){
                    var message = "News in "+channel+"\n";
                    //message +=data.weather[2].main+"\n"
                    message+= "Headlines: "+(data.articles[1].title)
                    message+= "Link: "+(data.articles[1].urlToImage)//+"%"
                    ctx.reply(message);
                    console.log(message)
                 // }
            });
        })

app.hears('BBC Sport',ctx=>{
              var channel = "BBC Sport"
              console.log(channel)
              getNews(channel)
             .then(function(data){
                var i=1
                 // while(i<=10){
                    var message = "News in "+channel+"\n";
                    //message +=data.weather[2].main+"\n"
                    message+= "Headlines: "+(data.articles[1].title)
                    message+= "Link: "+(data.articles[1].urlToImage)//+"%"
                    ctx.reply(message);
                    console.log(message)
                 // }
            });
        })

app.hears('Tech Crunch',ctx=>{
              var channel = "Tech Crunch"
              console.log(channel)
              getNews(channel)
             .then(function(data){
                var i=1
                 // while(i<=10){
                    var message = "News in "+channel+"\n";
                    //message +=data.weather[2].main+"\n"
                    message+= "Headlines: "+(data.articles[1].title)
                    message+= "Link: "+(data.articles[1].urlToImage)//+"%"
                    ctx.reply(message);
                    console.log(message)
                 // }
            });
        })

app.hears('National Geographic',ctx=>{
              var channel = "National Geographic"
              console.log(channel)
              getNews(channel)
             .then(function(data){
                var i=1
                 // while(i<=10){
                    var message = "News in "+channel+"\n";
                    //message +=data.weather[2].main+"\n"
                    message+= "Headlines: "+(data.articles[1].title)
                    message+= "Link: "+(data.articles[1].urlToImage)//+"%"
                    ctx.reply(message);
                    console.log(message)
                 // }
            });
        })


//This function gets the data for the requested city from api.openweathermap.org
function getWeatherData(city){

var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=6656a4dbba28453e82898e39e3b3e6e8"
  //var url = "http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1"
  var options ={
      url: url,
      method: "GET",
      json:true,
    }
    var response = request(options);
     return response.then(function (r){
        return r[0].body
    });
}


function getNews(channel){
  var newsOp;
 if(channel=='BBC news')
   { newsOp="bbc-news"
   }
 
  if(channel=='The Times of India')
      { newsOp="the-times-of-india"}

    if(channel=='CNN')
      { newsOp="cnn"}

    if(channel=='BBC Sport')
      { newsOp="bbc-sport"}

    if(channel=='Tech Crunch')
      { newsOp="techcrunch"}

    if(channel=='National Geographic')
      { newsOp="national-geographic"}

var url = "https://newsapi.org/v1/articles?source="+newsOp+"&apiKey=59d1acae7d94454194dfd31ab070a98a"
  var options ={
      url: url,
      method: "GET",
      json:true,
    }
    var response = request(options);
     return response.then(function (r){
        return r[0].body
    });
   }

 function getMovie(movie){
  var url ="http://www.omdbapi.com/?t="+movie
  var options ={
      url: url,
      method: "GET",
      json:true,
    }
    var response = request(options);
     return response.then(function (r){
        return r[0].body
    });

 }

app.startPolling()