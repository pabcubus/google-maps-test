/**
 * @class GMapsTest.gmt-controllers.MapController
 * @description This controller is the one that interacts with the map page/state.
 */
gmtCons.controller('MapController', function(lodash, DataService, GoogleMapsService) {
	'use strict'

	var vm		= this;

	vm.map		= null;
	vm.markers	= [];
	vm.readFile = readFile;

	init();

	/**
	 * @function
	 * @name readFile
	 * @memberOf GMapsTest.gmt-controllers.MapController
	 * @param {array} fileContent This is an array of strings containing the addresses
	 * @description This function gets the service's response and it will display the coordinates on the map
	 */
	function readFile(fileContent){
		vm.markers	= [];

		lodash.forEach(fileContent, function(line){
			var address = encodeURIComponent(line.split(',')[0].trim());

			DataService.performOperation(
				'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ',Bogota&key=AIzaSyDynangdOxvjHfzaqYA4xYbAXJH-zUqjg8'
				, 'GET')
				.then(function(data){
					var location = data.data.results[0].geometry.location;
					var address = data.data.results[0].formatted_address;
					vm.markers.push( GoogleMapsService.setSite(vm.map, location.lat, location.lng, address, address) );
					GoogleMapsService.centerMap(vm.map, vm.markers);
				})
				.catch(function(error){
					console.log('error: ', error);
				});
		});
	}

	/**
	 * @function
	 * @name init
	 * @memberOf GMapsTest.gmt-controllers.MapController
	 * @description Init function to initiate several things on the page
	 */
	function init(){
		vm.map = GoogleMapsService.createMap('map');
	}
});
