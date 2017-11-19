var mainVm = new Vue({
    el: '#app',

    data: {
		temp:0,
    },
	methods: {
		// 	get('/getdata', function(data, status) {
		// 		data = JSON.parse(data)
		// 		console.log(data)
		// 	// axios.get('https://api.darksky.net/forecast/aac5cc16d61365dd24ade4fc5dcd3681/37.8267,-122.4233', (currenttemp) =>{
		// 	})
		//  }
			request: function (response) {
				console.log('got to the vue page')
			 	$.get('/getdata', (dataFromServer) => {
					console.log(dataFromServer)
				//   this.temp = response
				})
		  	}
	}
})

//
//
// export default {
//    data() {
// 	 return {
// 	   quote: ''
// 	 }
//    },
//    methods: {
// 	 getQuote() {
// 	   this.$http
// 		 .get('http://localhost:3001/api/random-quote', (data) => {
// 		   this.quote = data;
// 		 })
// 		 .error((err) => console.log(err))
// 	 }
//    }
//  }
