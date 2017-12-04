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
							forecast:0,
							lifts:null,
							snowdepth:null,
							facebook:null,
							wind:0,
						}
					},
					created: function(){
						console.log('created the ski area component')
						$.get('/getdata', (dataFromServer) => {
							// console.log(dataFromServer)
							// console.log(dataFromServer)
							// this.temp = dataFromServer.currently.apparentTemperature
							// this.precip = dataFromServer.currently.precipProbability
							// this.visi = dataFromServer.currently.visibility
							// this.wind = dataFromServer.currently.windSpeed
						//   this.temp = response
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
