const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.use(express.static('./public'))

app.get('/', function(req, res) {

res.sendFile('./public//index.html', {root:'./'})
})

// where the calls start
app.get('/getdata', function(req, res){
	var darksky = `https://api.darksky.net/forecast/aac5cc16d61365dd24ade4fc5dcd3681/37.8267,-122.4233`
	request(darksky, function(err, response, dataFromServer){
		var cleanData = JSON.parse(dataFromServer)
		console.log(cleanData.currently)
		res.send(cleanData)
		console.log('apiCallworking')
	})
})
//listen
app.listen(8083, function(){

    console.log('server listening on port 8083')
})
