/**
 * @class GMapsTest.gmt-service.GoogleMapsService
 * @description This handles all according to the Google Maps API
 */
gmtSers.service('GoogleMapsService', function($q, lodash, DataService) {
	'use strict'

	var vm = this;

	vm.selectedMarkers = [];
	vm.selectedMarkersPath = null;
	vm.selectedMarkersPoints = null;
	vm.createMap = createMap;
	vm.setSite = setSite;
	vm.markers = [];
	vm.centerMap = centerMap;
	vm.markerType = {
		site: {
			url: 'app/images/map-marker.png',
			size: new google.maps.Size(39, 39),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 32)
		},
		site_bad: {
			url: 'app/images/map-marker-red.png',
			size: new google.maps.Size(39, 39),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 32)
		}
	};

	/**
	 * @function
	 * @name createMap
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {string}	divId	The div in which the map is going to be displayed
	 * @param {integer}	zoom	Zoom number according to Google Maps API
	 * @returns {object} The new map
	 * @description This function creates a new map to be displaye on the page
	 */
	function createMap(divId, zoom) {
		var map = new google.maps.Map(document.getElementById(divId), {
			center: {
				lat: 40.7591704,
				lng: -74.0392717
			},
			scrollwheel: true,
			zoom: zoom ? zoom : 8
		});

		map.addListener('bounds_changed', function() {
			var zoom = map.getZoom();
			if (zoom >= 20) {
				map.setZoom(17);
			}
		});

		return map;
	}

	/**
	 * @function
	 * @name setSite
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {object}	map			The map object previously created
	 * @param {integer}	lat			Latitude
	 * @param {integer}	lng			Longitude
	 * @param {string}	string		String that puts a title
	 * @param {integer}	markerId	Marker ID
	 * @returns {object} The new marker
	 * @description This function creates a new map to be displaye on the page
	 */
	function setSite(map, lat, lng, string, markerId) {
		if (map && lat && lng) {
			var marker = new google.maps.Marker({
				position: {
					lat: lat,
					lng: lng
				},
				map: map,
				icon: vm.markerType.site,
				animation: google.maps.Animation.DROP,
				type: 'site',
				id: markerId ? markerId : null
			});

			if (string) {
				var infowindow = new google.maps.InfoWindow({
					content: '<div id="content">' + string + '</div>'
				});

				marker.addListener('click', function() {
					infowindow.open(map, marker);
					addSelectedMarker(map, marker);
					addUnicornPath(map, marker);
				});
			}

			vm.markers.push(marker);

			return marker;
		}
	}

	/**
	 * @function
	 * @name centerMap
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {object}	map			The map object previously created
	 * @param {array}	markers		Array of previously created markers
	 * @description This functions center the map taking the markers positions
	 */
	function centerMap(map, markers) {
		var bounds = new google.maps.LatLngBounds();
		//  Go through each...
		lodash.forEach(markers, function(marker) {
			bounds.extend(marker.position);
		});
		//  Fit these bounds to the map
		map.fitBounds(bounds);
	}

	/**
	 * @function
	 * @name addUnicornPath
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {object}	map			The map object previously created
	 * @param {object}	marker		The marker that has the initial position of the unicorn
	 * @description This function displays an image from this marker to the closest marker
	 */
	function addUnicornPath(map, marker) {
		var promises = [];

		if (vm.unicornPath) {
			vm.unicornPath.setMap(null);
		}

		vm.markers.forEach(function(mark, index) {
			var maxDistance = null;
			var distance = getDistanceFromLatLonInKm(marker.position.lat(), marker.position.lng(), mark.position.lat(), mark.position.lng());

			if ((0 < distance) && ((distance < maxDistance) || (maxDistance == null))){
				maxDistance = distance;
				vm.unicornPathPoints = [
					{
						lat: marker.position.lat(),
						lng: marker.position.lng(),
					},
					{
						lat: mark.position.lat(),
						lng: mark.position.lng(),
					}
				];
			}
		});

		vm.unicornPath = new google.maps.Polyline({
			path: vm.unicornPathPoints,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 0,
			icons: [{
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 8,
					strokeColor: '#393'
				},
				offset: '100%'
			}]
		});

		vm.unicornPath.setMap(map);

		animateCircle(vm.unicornPath);
	}

	/**
	 * @function
	 * @name addSelectedMarker
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {object}	map			The map object previously created
	 * @param {object}	marker		The marker that has the initial position of the unicorn
	 * @description This functions selects a marker, and when 2 markers are selected it will trigger a path between them
	 */
	function addSelectedMarker(map, marker) {
		if (vm.selectedMarkers.length >= 2) {
			vm.selectedMarkersPoints = [];
			vm.selectedMarkersPath.setMap(null);
			lodash.forEach(vm.selectedMarkers, function(mark) {
				mark.setIcon(vm.markerType.site.url);
			});
			vm.selectedMarkers = [];
		}
		marker.setIcon(vm.markerType.site_bad.url);
		vm.selectedMarkers.push(marker);

		if (vm.selectedMarkers.length == 2) {
			vm.selectedMarkersPoints = [];

			lodash.forEach(vm.selectedMarkers, function(mark) {
				vm.selectedMarkersPoints.push({
					lat: mark.position.lat(),
					lng: mark.position.lng(),
				});
			});

			vm.selectedMarkersPath = new google.maps.Polyline({
				path: vm.selectedMarkersPoints,
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});

			vm.selectedMarkersPath.setMap(map);
		}
	}

	/**
	 * @function
	 * @name animateCircle
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {object}	line	The object with the Polyline
	 * @description This function animates the unicorn between 2 points
	 */
	function animateCircle(line) {
		var count = 0;
		window.setInterval(function() {
			count = (count + 1) % 200;

			var icons = line.get('icons');
			icons[0].offset = (count / 2) + '%';
			line.set('icons', icons);
		}, 20);
	}

	/**
	 * @function
	 * @name getDistanceFromLatLonInKm
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {integer}	lat1	Latitude from the first point
	 * @param {integer}	lon1	Longitude from the first point
	 * @param {integer}	lat2	Latitude from the second point
	 * @param {integer}	lon2	Longitude from the second point
	 * @returns {integer} 		The distance between 2 points
	 * @description This function calculates the distance between 2 points
	 */
	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	/**
	 * @function
	 * @name deg2rad
	 * @memberOf GMapsTest.gmt-service.GoogleMapsService
	 * @param {integer}	deg	The latitude in degrees
	 * @returns {integer} 	Radians
	 * @description Converts degrees to radians
	 */
	function deg2rad(deg) {
		return deg * (Math.PI / 180)
	}
});
