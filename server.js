const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cheerio = require('cheerio')
const app = express()
const moment = require('moment')
const secrets = require('./secrets.js')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//cookies from mozilla... chocolate chip cookies
var sessionsModule = require('client-sessions')
//connect to mongoose
mongoose.connect('mongodb://localhost:27017/peakchoice')

var sessionsMiddleware = sessionsModule({
    // we call the sessionsModule, passing in an object defining how the sessions middleware should work.
    // the sessionsModule then returns the sessionsMiddleware function
    cookieName: 'in-class-auth-demo-cookie',
    // in a later lecture, we will learn how to NOT put secrets directly in our source code
    secret: 'peakchoice8080',
    requestKey: 'session',
    duration: 86400 * 1000 * 7, // one week in milliseconds
    cookie: {
        httpOnly: true,
        secure: false, // use `secure:true` if you're deployed using HTTPS
    }
})
app.use(sessionsMiddleware)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//this is where the user login is defined
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: function(){ return new Date()}
    }
})
var User = mongoose.model('User', UserSchema)

app.use(express.static('./public'))
app.use(express.static('./'))

var checkIfLoggedIn = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in. proceeding to next route handler")
        next()
    }
    else {
        res.redirect('/register')
    }
}

app.get('/', function(req, res){
	res.sendFile('./public/index.html', {root:'./'})
})
app.get('/register', function(req, res){
    res.sendFile('./public/html/register.html', {root: './'})
})
//-----Register logic------//
app.post('/register', function(req, res){
    console.log('request body? ', req.body)

    var newUser = new User(req.body)
    bcrypt.genSalt(11, function(saltErr, salt) {
        if (saltErr) { console.log(saltErr)}
        console.log('salt? ', salt)
        bcrypt.hash(newUser.password, salt, function(hashErr, hashedPassword){
            if (hashErr) { console.log(hashErr) }
            newUser.password = hashedPassword
            newUser.save(function(err){
                if (err) { console.log('failed to save user')}
                else {
                    req.session._id = newUser._id
                    res.send({success:'success!'})
                }
            })

        })
    })

})


//------ Login Logic -------//
app.post('/login', function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if ( err ) {
            console.log('failed to find user')
            res.send({failure:'failure'})
        }
        else if ( !user ) {
            res.send({failure:'failure'})
        }
        // this person is trying to log in as a user who DOES exist in our database,
        // but do the passwords match?
        else {
            // bcrypt.compare will hash req.body.password using the salt in user.password, and then compares if the resulting hash matches user.password
            bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){
                if (bcryptErr) {
                    console.log(bcryptErr)
                    res.send({failure:'failure'})
                }
                else if ( !matched ) {
                    console.log('passwords dont match')
                    res.send({failure:'failure'})
                }
                else if ( matched ) {
                    // the user's password hashed to an exact match of the hash stored in the database
                    req.session._id = user._id
                    res.send({success:'success'})
                }
            })
        }

    })
})



//This is where the ski area is defined
let skiAreaSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lat: Number,
	lng: Number,
	fourSquareID:{ type: String, required: true },
	liftieName: { type: String, reuired: false},
});

let skiAreaModel = mongoose.model('SkiArea', skiAreaSchema);


app.get('/getsSkiAreas', function(req, res) {
	skiAreaModel.find(
		{},
		function(err, allskiareas) {
			if(err) {
				res.status(500).send(err)
				return console.log(err)
			}
			console.log(allskiareas)
			res.status(200).send(allskiareas)
		}
	)
})
// where the calls start
app.get('/getdata', function(req, res){
	skiAreaModel.find(
		{_id:req.query},
		function(err, area) {
			if(err) {
				res.send(500).send(err)
				return console.log(err)
			}
			res.status(200).send(area)
		}
	)
	var darksky = `https://api.darksky.net/forecast/${secrets.dks}/39.4817,-106.0384`;
	var liftie = `https://liftie.info/api/resort/vail`;
	// var facebook = 'https://graph.facebook.com/v2.9/105551316143942/insights/page_places_checkin_total&access_token=193618711200710|6e3f49b536d12f9e19ebc590cc47cbd1'
    // var facebook = `https://graph.facebook.com/v2.9/105551316143942/insights/page_places_checkin_total_unique?access_token=EAACEdEose0cBANxPlLxo6YC3ZCg0vDl9RdWjIBJXbsOZAZBMLXMR6vsIRr8FN9gMfLrMPFmuiNZAJr3S6TxoxvtVB6tQmwt1pEoW0d7G8tSQPsXhCOujTQ2IeZBDcnUe5oaQjlxo8YmInUKTIUJZAZCcLRoxwniaFOhdHasnEp6mkxWHcPTEtHDAntVDZBNwgukZD`
	// var facebook = `https://graph.facebook.com/v2.11/search?type=place&center=39.1911,106.8175&distance=1&fields=name,checkins&date_preset=last_14d,location&access_token=193618711200710|6e3f49b536d12f9e19ebc590cc47cbd1`
	// search?type=place&center=39.7392,104.9903&distance=3000&date_preset=yesterday&fields=name,checkins
	// var foursquare =`https://api.foursquare.com/v2/venues/timeseries?49da5cd2f964a5207b5e1fe3&1512410153000&1512496553000&totalCheckins&client_id=J0XJEGV1NLXEYXVMHGYUDFRKIPQP2SR4YYQPDJMTNMCLCSFH&client_secret=2CPHNEM0ATCF5S1DMGEHKF4Y5H2KGOXUSITVM313XAPY0ECH&v=20171205`
	var foursquare = `https://api.foursquare.com/v2/venues/4b3397c5f964a5202f1b25e3?client_id=J0XJEGV1NLXEYXVMHGYUDFRKIPQP2SR4YYQPDJMTNMCLCSFH&client_secret=${secrets.fsq}&v=20171205`
	// var aeris = `http://api.aerisapi.com/observations/pierre,sd?client_id=FRlIH3nHPfrwY1qU9cc73&client_secret=yQor3D1ZdsLKqmJYcjGD9MYQnz9tao6XnL1Jc75U`;
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
		snowfall:0,
		lifts: '',
		fourSquareVisits:0,
	};
	//DarkSky Request

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
		fullData.snowfall = cleanDarkSkyData.daily.data[0].precipAccumulation
		console.log('Dark Sky Api call worked');
		//lift request
		request(liftie, function(err, response, liftieData){
			var cleanLiftieData = JSON.parse(liftieData);
			fullData.lifts = cleanLiftieData.lifts.stats;
			console.log('Liftie api call worked');
			// console.log(fullData)
			// request(aeris, function(err, response, aerisData){
			// 	var cleanAerisData = JSON.parse(aerisData);
			// 	console.log('Aeris api call worked')
			// 	// console.log(cleanAerisData)
			// 	console.log(cleanAerisData.response.ob.snowDepthIN)
				// console.log(cleanAerisData.response.ob.snowDepthIN)

			// request('https://www.google.com/search?rlz=1C5CHFA_enUS750US750&ei=Nt8lWpmkFczjjwT4t6D4BQ&q=breckenridge+ski+resort&oq=breckenridge+ski+resort', function(err, response, html){
				// var $ = cheerio.load(html)
				// console.log($('a'))
				// console.log(html)
				// console.log($('table ._tS'))
				// var document = html
				// var test = document.querySelectorAll('table ._tS')[0].innerHTML
				// console.log(test)
			//FACEBOOK request
			// request(facebook, function(err, response, facebookData){
			// 	// console.log(facebookData)
			// 	var cleanFBData = JSON.parse(facebookData)
			// 	console.log(cleanFBData)
			//foursquare request
			request(foursquare, function(err, response, fourSquareData){
				var cleanFourSquareData = JSON.parse(fourSquareData);
				fullData.fourSquareVisits = cleanFourSquareData.response.venue.stats.visitsCount;
				console.log(cleanFourSquareData.response.venue)
				console.log(fullData.fourSquareVisits)
				// console.log(fourSquareData)
				res.send(fullData)
			})
		})
	})
})




app.listen(8083, function(){
    console.log('server listening on port 8083')
})
