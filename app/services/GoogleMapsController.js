app.service('GoogleMapsController', function(lodash) {
	var vm = this;

	vm.selectedMarkers = [];
	vm.selectedMarkersPath = null;
	vm.selectedMarkersPoints = null;
	vm.createMap = createMap;
	vm.setSite = setSite;
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
				});
			}

			return marker;
		}
	}

	function centerMap(map, markers) {
		var bounds = new google.maps.LatLngBounds();
		//  Go through each...
		lodash.forEach(markers, function(marker) {
			bounds.extend(marker.position);
		});
		//  Fit these bounds to the map
		map.fitBounds(bounds);
	}

	function addSelectedMarker(map, marker) {
		if (vm.selectedMarkers.length >= 2) {
			vm.selectedMarkersPoints = [];
			vm.selectedMarkersPath.setMap(null);
			lodash.forEach(vm.selectedMarkers, function(mark){
				mark.setIcon(vm.markerType.site.url);
			});
			vm.selectedMarkers = [];
		}
		marker.setIcon(vm.markerType.site_bad.url);
		vm.selectedMarkers.push(marker);


		if (vm.selectedMarkers.length == 2) {
			vm.selectedMarkersPoints = [];

			lodash.forEach(vm.selectedMarkers, function(mark){
				vm.selectedMarkersPoints.push(
					{
						lat: mark.position.lat(),
						lng: mark.position.lng(),
					}
				);
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
});
