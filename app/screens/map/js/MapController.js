app.controller('MapController', function(lodash, DataController, GoogleMapsController) {
	'use strict'

	var vm		= this;

	vm.map		= null;
	vm.markers	= [];
	vm.readFile = readFile;

	init();

	function readFile(fileContent){
		vm.markers	= [];

		lodash.forEach(fileContent, function(line){
			var address = encodeURIComponent(line.split(',')[0].trim());

			DataController.performOperation(
				'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ',Bogota&key=AIzaSyDynangdOxvjHfzaqYA4xYbAXJH-zUqjg8'
				, 'GET')
				.then(function(data){
					var location = data.data.results[0].geometry.location;
					var address = data.data.results[0].formatted_address;
					vm.markers.push( GoogleMapsController.setSite(vm.map, location.lat, location.lng, address, address) );
					GoogleMapsController.centerMap(vm.map, vm.markers);
				})
				.catch(function(error){
					console.log('error: ', error);
				});
		});
	}

	function init(fileContent){
		vm.map = GoogleMapsController.createMap('map');
	}
});
