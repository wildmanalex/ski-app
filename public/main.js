var myRouter = new VueRouter({
	data: {
		// temp:0,
		// precip:0,
		// visi:0,
		// wind:0,
		// userinput:'',
		// skiareas: {
		// 	breckenridge:{lat:39.480724,lng:-106.066238},
		// 	keystone: {lat:39.605011, lng:-105.953438}
		// }
    },
	methods: {
			// request: function (response) {
			//
			// 	$.get('/getdata', (dataFromServer) => {
			// 		// console.log(dataFromServer)
			// 		this.temp = dataFromServer.currently.apparentTemperature
			// 		this.precip = dataFromServer.currently.precipProbability
			// 		this.visi = dataFromServer.currently.visibility
			// 		this.wind = dataFromServer.currently.windSpeed
			// 	//   this.temp = response
			// 	})
			// 	$.get('getLiftData', (liftdata) => {
			// 		console.log(liftdata)
			// 	})
			// 	this.userinput = ($('#locationTextField').val())
			// }
	},
    routes: [
		{
		path: '/skiArea/:location',
		component: function(resolve, reject) {
			// console.log(this.wind)
			$.get('/skiarea.html', function(htmlFromServer){
				var newComponent = {
					template: htmlFromServer,
					data: function(){
						return {
							summary:'',
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
							lifts:null,
							snowdepth:null,
							facebook:null,
							day:'',
						}
					},
					created: function(){
						console.log('created the ski area component')
						$.get('/getdata', (fullData) => {
							console.log(fullData)
							// this.day = new Date(fullData.day)
							this.firstDay.day = (moment.unix(fullData.forecast.firstDay.day).format('dddd'));
							this.firstDay.icon = fullData.forecast.firstDay.icon
							this.firstDay.lowTemp = fullData.forecast.firstDay.lowTemp
							this.firstDay.highTemp = fullData.forecast.firstDay.highTemp
							//secondDay
							this.secondDay.day = (moment.unix(fullData.forecast.secondDay.day).format('dddd'));
							this.secondDay.icon = fullData.forecast.firstDay.icon
							this.secondDay.lowTemp = fullData.forecast.firstDay.lowTemp
							this.secondDay.highTemp = fullData.forecast.firstDay.highTemp
							//thirdDay
							this.thirdDay.day = (moment.unix(fullData.forecast.thirdDay.day).format('dddd'));
							this.thirdDay.icon = fullData.forecast.firstDay.icon
							this.thirdDay.lowTemp = fullData.forecast.firstDay.lowTemp
							this.thirdDay.highTemp = fullData.forecast.firstDay.highTemp
							//fourthDay
							this.fourthDay.day = (moment.unix(fullData.forecast.fourthDay.day).format('dddd'));
							this.fourthDay.icon = fullData.forecast.firstDay.icon
							this.fourthDay.lowTemp = fullData.forecast.firstDay.lowTemp
							this.fourthDay.highTemp = fullData.forecast.firstDay.highTemp
							//fifthDay
							this.fifthDay.day = (moment.unix(fullData.forecast.fifthDay.day).format('dddd'));
							this.fifthDay.icon = fullData.forecast.firstDay.icon
							this.fifthDay.lowTemp = fullData.forecast.firstDay.lowTemp
							this.fifthDay.highTemp = fullData.forecast.firstDay.highTemp
							// console.log(this.day)
							this.summary = fullData.forecast.summary
							this.lifts = "There are " + fullData.lifts.open + " lifts open and  " + fullData.lifts.closed +" closed"
						})
					},
					destroyed: function(){ console.log('destroyed the ski area component')}
				}
				resolve(newComponent)
			})
		}
	}
	],
	// methods: {
	// 		show: function(){
	//
	// 		},
	// 		request: function (response) {
	//
	// 		 	$.get('/getdata', (dataFromServer) => {
	// 				// console.log(dataFromServer)
	// 				this.temp = dataFromServer.currently.apparentTemperature
	// 				this.precip = dataFromServer.currently.precipProbability
	// 				this.visi = dataFromServer.currently.visibility
	// 				this.wind = dataFromServer.currently.windSpeed
	// 			//   this.temp = response
	// 			})
	// 			$.get('getLiftData', (liftdata) => {
	// 				console.log(liftdata)
	// 			})
	// 			this.userinput = ($('#locationTextField').val())
	// 	  	},
	//
	//
	// }
})

var mainVm = new Vue({
    el: '#app',
	router: myRouter,
    data: {
		temp:0,
		precip:0,
		visi:0,
		wind:0,
		userinput:'',
		skiareas: {
			breckenridge:{lat:39.480724,lng:-106.066238},
			keystone: {lat:39.605011, lng:-105.953438}
		}
    },
	methods: {
			show: function(){

			},
			request: function (response) {
				//
				// 	$.get('/getdata', (dataFromServer) => {
				// 	// console.log(dataFromServer)
				// 	this.temp = dataFromServer.currently.apparentTemperature
				// 	this.precip = dataFromServer.currently.precipProbability
				// 	this.visi = dataFromServer.currently.visibility
				// 	this.wind = dataFromServer.currently.windSpeed
				// //   this.temp = response
				// })
				// $.get('getLiftData', (liftdata) => {
				// 	console.log(liftdata)
				// })
				// this.userinput = ($('#locationTextField').val())
		  	},


	}
})
// how to organize the vue app, global variables, componentRestrictions
//vue cli, webpack handles SPA
