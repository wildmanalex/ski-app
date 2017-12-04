const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

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
		forecast: '',
		lifts: ''
	};
	request(darksky, function(err, response, darkskydata){
		// console.log(darkskydata)
		var cleanDarkSkyData = JSON.parse(darkskydata)
		// console.log(cleanDarkSkyData)
		// console.log(cleanData.currently)
		// console.log(cleanData)
		// res.send(cleanDarkSkyData)
		fullData.forecast = cleanDarkSkyData.currently.summary
		console.log(fullData.forecast, 'look here')
		console.log('Dark Sky Api call working')
	})
	request(liftie, function(err, response, liftieData){
		var cleanLiftieData = JSON.parse(liftieData)
		// console.log(cleanLiftieData)
		// res.send(cleanLiftieData)
		fullData.lifts = liftieData.lifts
		console.log('Liftie api call worked')
	})
	res.send(fullData)
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
