const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const moment = require('moment')

app.use(express.static('./public'))
app.use(express.static('./'))

app.get('/', function(req, res) {

res.sendFile('./public//index.html', {root:'./'})
})

// where the calls start
app.get('/getdata', function(req, res){
	var darksky = `https://api.darksky.net/forecast/aac5cc16d61365dd24ade4fc5dcd3681/39.4817,-106.0384`;
	var liftie = `https://liftie.info/api/resort/keystone`;
	var fullData = {
		forecast: {
			firstDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			secondDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			thirdDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			fourthDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			fifthDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
		},
		lifts: '',
	};
	request(darksky, function(err, response, darkskydata){
		var cleanDarkSkyData = JSON.parse(darkskydata);
		//firstDay
		fullData.forecast.firstDay.day = cleanDarkSkyData.daily.data[0].time;
		fullData.forecast.firstDay.icon = cleanDarkSkyData.daily.data[0].icon;
		fullData.forecast.firstDay.lowTemp = cleanDarkSkyData.daily.data[0].temperatureLow;
		fullData.forecast.firstDay.highTemp = cleanDarkSkyData.daily.data[0].temperatureHigh;
		//secondDay
		fullData.forecast.secondDay.day = cleanDarkSkyData.daily.data[1].time;
		fullData.forecast.secondDay.icon = cleanDarkSkyData.daily.data[1].icon;
		fullData.forecast.secondDay.lowTemp = cleanDarkSkyData.daily.data[1].temperatureLow;
		fullData.forecast.secondDay.highTemp = cleanDarkSkyData.daily.data[1].temperatureHigh;
		//thirdDay
		fullData.forecast.thirdDay.day = cleanDarkSkyData.daily.data[2].time;
		fullData.forecast.thirdDay.icon = cleanDarkSkyData.daily.data[2].icon;
		fullData.forecast.thirdDay.lowTemp = cleanDarkSkyData.daily.data[2].temperatureLow;
		fullData.forecast.thirdDay.highTemp = cleanDarkSkyData.daily.data[2].temperatureHigh;
		//fourthDay
		fullData.forecast.fourthDay.day = cleanDarkSkyData.daily.data[3].time;
		fullData.forecast.fourthDay.icon = cleanDarkSkyData.daily.data[3].icon;
		fullData.forecast.fourthDay.lowTemp = cleanDarkSkyData.daily.data[3].temperatureLow;
		fullData.forecast.fourthDay.highTemp = cleanDarkSkyData.daily.data[3].temperatureHigh;
		//fifthDay
		fullData.forecast.fifthDay.day = cleanDarkSkyData.daily.data[4].time;
		fullData.forecast.fifthDay.icon = cleanDarkSkyData.daily.data[4].icon;
		fullData.forecast.fifthDay.lowTemp = cleanDarkSkyData.daily.data[4].temperatureLow;
		fullData.forecast.fifthDay.highTemp = cleanDarkSkyData.daily.data[4].temperatureHigh;
		// console.log(fullData.forecast.day, 'look here');
		console.log('Dark Sky Api call worked');
		request(liftie, function(err, response, liftieData){
			var cleanLiftieData = JSON.parse(liftieData);
			// console.log(cleanLiftieData)
			// res.send(cleanLiftieData)
			fullData.lifts = cleanLiftieData.lifts.stats;
			console.log('Liftie api call worked');
			console.log(fullData)
			res.send(fullData)
		})
	})
})


// app.get('/getLiftData', function(req, res){
// 	// var liftie = `https://liftie.info/api/resort/breckenridge`
// 	request(liftie, function(err, response, liftdata){
// 		var cleanData = JSON.parse(liftdata)
// 		// console.log(cleanData)
// 		res.send(cleanData)
// 	})
// })
//listen
app.listen(8083, function(){
    console.log('server listening on port 8083')
})
