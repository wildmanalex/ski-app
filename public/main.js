var myRouter = new VueRouter({
    routes: [
		{
			path:'/',
			component: function(resolve, reject) {
				$.get('/register.html', function(htmlFromServer){
					var newComponent = {
						template: htmlFromServer,
						data: function(){
							return {
								registerForm: {
						            username: '',
						            password: '',
						        },
								loginForm: {
						            username: '',
						            password: '',
						        },
								clicked: false,
							}
						},
						methods: {
							register : function() {
								console.log(this.registerForm.password)
								// we don't actually refer to the event object inside of this function, so there's no need to name the event object
								$.post('/register', this.registerForm, function(dataFromServer){
									console.log(dataFromServer)
								})
							},
							login : function() {
								// we don't actually refer to the event object inside of this function, so there's no need to name the event object
								$.post('/login', this.loginForm, (dataFromServer)=>	{
									if(dataFromServer.success) {
										// this.router.push('/search')
										this.$router.push({ path: `/search` })
									}
									console.log(dataFromServer)
								})
							},
						},
						created: function(){ console.log('created the register page')},
						destroyed: function(){ console.log('destroyed the register page')},
					}
					resolve(newComponent)
				})
			}
		},
		{
			path:'/search',
			component: function(resolve, reject) {
				$.get('/search.html', function(htmlFromServer) {
					var newComponent = {
						template: htmlFromServer,
						// data: function(){
						// 	return {
						// 		test:'fdsfdsfdsfdsfs',
						// 		listofskiareas: [],
						// 		skiAreaNames:[],
						// 	}
						//
						// },
						// methods: {
						// 	test2: function() {
						// 		$.get('/getsSkiAreas', (skiAreasFromServer) => {
						// 			// console.log(listofskiareas)
						// 			console.log('created the register page')
						// 			// listofskiareas = skiAreasFromServer
						// 			for(var i = 0; i < skiAreasFromServer.length; i++){
						// 				var skiAreaNamesTemp = [];
						// 				skiAreaNamesTemp += skiAreasFromServer[i].name;
						// 				this.skiAreaNames.name = skiAreaNamesTemp
						// 				console.log(this.skiAreaNames)
						// 			}
						// 			// console.log(skiAreaNames)
						// 		})
						// 	},
						// },
						// created: function() {
						// 	$.get('/getsSkiAreas', (skiAreasFromServer) => {
						// 		// console.log(listofskiareas)
						// 		console.log('created the register page')
						// 		// listofskiareas = skiAreasFromServer
						// 		for(var i = 0; i < skiAreasFromServer.length; i++){
						// 			var skiAreaNamesTemp = [];
						// 			skiAreaNamesTemp += skiAreasFromServer[i].name;
						// 			this.skiAreaNames.name = skiAreaNamesTemp
						// 			console.log(this.skiAreaNames)
						// 		}
						// 		// console.log(skiAreaNames)
						// 	})
						// },
						created: function(){
							this.$parent.testmethod()
							console.log('created the search page')},
						destroyed: function(){console.log('destroyed the search page')},
					}
					resolve(newComponent)
				})
			}
		},
		{
		path: '/skiArea/:location',
		component: function(resolve, reject) {
			$.get('/skiarea.html', function(htmlFromServer){
				var newComponent = {
					template: htmlFromServer,
					data: function(){
						return {
							requestedLocation:'',
							listofskiareas: [],
							requestedLat:0,
							requestedLng:0,
							requestedliftieName:'',
							requestedFSID:'',
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
							snowfall:0,
							fourSquareVisits:null,
						}
					},
					created: function(){
						console.log('created the ski area component')
						if(this.$route.params.location === 'wolfcreek'){
							this.requestedLocation = 'alta';
						}
						else if(this.$route.params.location === 'purgatory'){
							this.requestedLocation = 'boreal';
						}
						else if(this.$route.params.location === 'howelsen'){
							this.requestedLocation = 'brighton';
						}
						else if(this.$route.params.location === 'eldora'){
							this.requestedLocation = 'cannon';
						}
						else {
							this.requestedLocation = this.$route.params.location;
						}
						$.get('/getsSkiAreas', (skiAreasFromServer) => {
							// console.log('created the register page')
							this.listofskiareas = skiAreasFromServer;

							for(var i = 0; i < this.listofskiareas.length; i++) {
								if(this.requestedLocation === this.listofskiareas[i].liftieName){
									var a = this.listofskiareas[i].lat;
									var b = this.listofskiareas[i].lng;
									var c = this.listofskiareas[i].liftieName;
									var d = this.listofskiareas[i].fourSquareID;
									$.get('/getdata', {lat: a, lng: b, liftieName: c, fsid: d}, (fullData) => {

										console.log(fullData)
										console.log('this workeddddd')
										this.day = new Date(fullData.day)
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
										//lifitie data
										if(fullData.liftieName === 'alta'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else if(fullData.liftieName === 'boreal'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else if(fullData.liftieName === 'brighton'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else if(fullData.liftieName === 'cannon'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else{
										this.lifts = "There are " + fullData.lifts.open + " lifts open and  " + fullData.lifts.closed +" closed";
										}
										//snowfall
										if(fullData.snowfall === 0){
											console.log('SNOWFALL WAS ZERO')
										}
										else {
											console.log('not zero')
										}
										this.snowfall = fullData.snowfall
										//foursquare visit counter
										this.fourSquareVisits = fullData.fourSquareVisits
										// console.log(this.fourSquareVisits)
										// console.log(this.fifthDay)
									})
									// this.requestedLat === this.listofskiareas[i].lat;
									// this.requestedLng === this.listofskiareas[i].lng;
									// this.requestedliftieName === this.listofskiareas[i].liftieName;
									// this.requestedFSID === this.listofskiareas[i].fourSquareID;
									// console.log(this.listofskiareas[i].fourSquareID)
								}
							}
							// console.log(this.listofskiareas);
							// console.log(skiAreaNames)
						})
						},
						destroyed: function(){ console.log('destroyed the ski area component')}
					}
					resolve(newComponent)
				})
			}
		}
	]
})

var mainVm = new Vue({
    el: '#app',
	router: myRouter,
    data: {
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
		snowfall:0,
		fourSquareVisits:null,
		testforchild:'itworkedd',
		listofskiareas: [],
		skiAreaNames:[],
		dataForApis: {
			lat:0,
			long:0,
			liftieName:'',
		}
	},
	methods: {
		testmethod: function() {
			console.log('testmethod worked')
			$.get('/getsSkiAreas', (skiAreasFromServer) => {
				// console.log('created the register page')
				this.listofskiareas = skiAreasFromServer
				console.log(this.listofskiareas)

				for(var i = 0; i < skiAreasFromServer.length; i++){
					var skiAreaNamesTemp = [];
					skiAreaNamesTemp += skiAreasFromServer[i].name;
					this.skiAreaNames.name = skiAreaNamesTemp
					console.log(skiAreaNamesTemp)
					console.log(this.skiAreaNames)
				}
				// console.log(skiAreaNames)
			})
		},
		apiCalls: function(data) {
			console.log(data)
			$.get('/getdata', (fullData) =>{

				// console.log(fullData)
				console.log('this workeddddd')
				this.day = new Date(fullData.day)
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
				//snowfall
				this.snowfall = fullData.snowfall
				//foursquare visit counter
				this.fourSquareVisits = fullData.fourSquareVisits
				// console.log(this.fourSquareVisits)
				// console.log(this.fifthDay)
			})
			//this get will start the calls to the apis, I will refer tho this get from my component v-on:click='apicalls'
		}
	}
})
// how to organize the vue app, global variables, componentRestrictions
//vue cli, webpack handles SPA
