const mongoose = require('mongoose')

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/peakchoice')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
  // we're connected!


	let skiAreaSchema = new mongoose.Schema({
		name: { type: String, required: true },
		lat: Number,
		lng: Number,
		fourSquareID:{ type: String, required:true},
		liftieName: { type: String, required: false},
	});

	// let skiAreaModel = mongoose.model('SkiArea', skiArea);

	var skiArea = mongoose.model('skiArea', skiAreaSchema);

	var breck = new skiArea({
		   "name" : "Breckenridge",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Arapahoe Basin",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Winter Park",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Steamboat Springs",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Keystone",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Eldora",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Loveland",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Aspen Highlands",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Aspen",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Snowmass",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Copper Mountain",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Beaver Creek",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Monarch",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Vail",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Crested Butte",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Wolf Creek",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Purgatory",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Telluride",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})
	var breck = new skiArea({
		   "name" : "Howelsen Hill",
		   "lat" : 39.4817,
		   "lng" : -106.0384,
		   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
		   "liftieName": 'breck',
	})

	breck.save(function (err, breck){
		if(err) {
			console.log(err)
		}
		console.log(breck)
	})

	// db.close();
// })
