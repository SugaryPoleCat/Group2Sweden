var locationForm = document.getElementById('location-form');

var locationInput = document.getElementById('location-input');
var autocomplete = new google.maps.places.Autocomplete(locationInput);

locationForm.addEventListener('submit', geocode);

var routesList;
var totalTimeMin;
var segmentTimeMin;
var totalPrice;
var placesList;
var vehiclesList;
var segmentsList;

function geocode(e) {
	e.preventDefault();

	$('#loading').show();

	var currencyCode;
	var userLang = navigator.language || navigator.userLanguage;

	if (userLang == "sv-SE") {
		currencyCode = "SEK";
	} else {
		currencyCode = "USD";
	}

	var location = document.getElementById('location-input').value;

	var destination = document.getElementById('destination-input').value;
	axios.get('http://free.rome2rio.com/api/1.4/json/Search', {
			params: {
				key: 'S2Q8spaR',
				oName: location,
				dName: destination,
				currencyCode: currencyCode
			}
		})
		.then(function(response) {

			$('#loading').hide();

			document.getElementById('error-output').innerHTML = '';

			console.log(response);
			removePolyline();
			deleteMarkers();

			placesList = response.data.places;

			var lat1, lng1, lat2, lng2;
			lat1 = placesList[0].lat;
			lng1 = placesList[0].lng;
			lat2 = placesList[1].lat;
			lng2 = placesList[1].lng;

			calculateMidpoint(lat1, lng1, lat2, lng2);
			setZoom(calculateDistance(lat1, lng1, lat2, lng2));
			/* Sets a marker at location and destination */
			var pos1 = {
				lat: lat1,
				lng: lng1
			};
			var pos2 = {
				lat: lat2,
				lng: lng2
			};
			setMarker(pos1);
			setMarker(pos2);

			showRoutes();

			function showRoutes() {

				routesList = response.data.routes;

				var allOutput = `<div class="tabacc">`;

				for (var i = 0; i < routesList.length; i++) {

					allOutput += `
                            <div id="div${i}">
                            <input id="${i}" type="radio" name="tabs" onclick="writePath(${i});">
                            <label class="label-item" for="${i}"><h5 class="color-black">`;
					if (routesList[i].name.includes('Train') || routesList[i].name.includes('train')) {
						allOutput += '<i class="fas fa-train icon-i"></i>';
					}
					if (routesList[i].name.includes('Bus') || routesList[i].name.includes('bus')) {
						allOutput += '<i class="fas fa-bus icon-i"></i>';
					}
					if (routesList[i].name.startsWith('Fly') || routesList[i].name.includes('fly ')) {
						allOutput += '<i class="fas fa-plane icon-i"></i>';
					}
					if (routesList[i].name.includes('Drive') || routesList[i].name.includes('drive')) {
						allOutput += '<i class="fas fa-car icon-i"></i>';
					}
					if (routesList[i].name.includes('Walk') || routesList[i].name.includes('walk')) {
						allOutput += '<i class="fas fa-walking icon-i"></i>';
					}
					if (routesList[i].name.includes('Taxi') || routesList[i].name.includes('taxi') || routesList[i].name.includes('Uber') || routesList[i].name.includes('uber')) {
						allOutput += '<i class="fas fa-taxi icon-i"></i>';
					}
					if (routesList[i].name.includes('Ferry') || routesList[i].name.includes('ferry')) {
						allOutput += '<i class="fas fa-ship icon-i"></i>';
					}
					allOutput += `
                            ${routesList[i].name}
                            </h5>
                            `;

					allOutput += `
                            <p class="transport-time color-black"><b>`;

					if (typeof routesList[i].indicativePrices !== 'undefined') {
						totalPrice = routesList[i].indicativePrices[0].price;
					}
					totalTimeMin = convertTime(routesList[i].totalDuration);

					allOutput += `
                            ${totalTimeMin}
                            </b>
                            <br>
                            <b>`;
					if (typeof routesList[i].indicativePrices !== 'undefined') {
						if (currencyCode !== "SEK") {
							allOutput += '$';
						}
						allOutput += `${totalPrice}`;
						if (currencyCode == "SEK") {
							allOutput += ' kr';
						}
					}
					allOutput += `
                            </b>
                            </p>
                            </label>
                            <div class="tab-content">
                            <table class="table table-sm color-black">
                        `;

					segmentsList = response.data.routes[i].segments;
					vehiclesList = response.data.vehicles;

					for (var j = 0; j < segmentsList.length; j++) {

						allOutput += `
                            <tr><td class="color-black">
                            ${j + 1}.
                            ${vehiclesList[segmentsList[j].vehicle].name} 
                            from ${placesList[segmentsList[j].depPlace].shortName} 
                            to ${placesList[segmentsList[j].arrPlace].shortName}
                            </td><td style="text-align: right" class="color-black">`;

						segmentTimeMin = convertTime(segmentsList[j].transitDuration);

						allOutput += `
                            ${segmentTimeMin}
                            </td>
                            </tr>
                            `;
					}

					allOutput += `
                        </table>
                        </div>
                        </div>
                        `;
				}

				allOutput += '</div>';

				document.getElementById('all-routes').innerHTML = allOutput;

				if (routesList.length == 0) {
					var errorOutput = `
                                <div class="alert alert-danger error-text" role="alert">
                                Found no routes from ${location}
                                </div>`;
					document.getElementById('error-output').innerHTML = errorOutput;
				}

			}

		})
		.catch(function(error) {
			console.log(error);

			removePolyline();
			deleteMarkers();

			$('#loading').hide();

			document.getElementById('all-routes').innerHTML = '';

			var errorOutput = `
                        <div class="alert alert-danger error-text" role="alert">
                        <strong>Error.</strong> Can't find ${location}
                        </div>`;
			document.getElementById('error-output').innerHTML = errorOutput;

		})
}

function writePath(route) {
	if (typeof routesList !== 'undefined') {
		for (var i = 0; i < routesList.length; i++) {
			var segmentsListPath = routesList[route].segments;
			var segmentsListRemove = routesList[i].segments;
			for (var k = 0; k < segmentsListRemove.length; k++) {
				removePolyline();
			}
			for (var j = 0; j < segmentsListPath.length; j++) {
				if (typeof segmentsListPath[j].path !== 'undefined') {
					setPolyline(google.maps.geometry.encoding.decodePath(segmentsListPath[j].path));
				} else {
					setPolyline([{
							lat: placesList[segmentsListPath[j].depPlace].lat,
							lng: placesList[segmentsListPath[j].depPlace].lng
						},
						{
							lat: placesList[segmentsListPath[j].arrPlace].lat,
							lng: placesList[segmentsListPath[j].arrPlace].lng
						}
					]);
				}
			}
		}
	}
}

var polyline = [];

function setPolyline(_path) {
	polyline.push(new google.maps.Polyline({
		//map: map,
		path: _path,
		strokeColor: '#000000',
		strokeOpacity: 1,
		strokeWeight: 3
	}));
	polyline[polyline.length - 1].setMap(map);
}

function removePolyline() {
	if (typeof polyline !== 'undefined') {
		for (var index in polyline) {
			polyline[index].setMap(null);

		}
		polyline = [];
	}
}

var markers = [];
var stockholm = {
	lat: 59.334591,
	lng: 18.063240
};
var falun = {
	lat: 60.60357,
	lng: 15.62597
};
var are = {
	lat: 63.40109,
	lng: 13.08222
};

var mapDiv = document.getElementById('map');
var mapCenter;
var zoom = 6;
mapCenter = {
	lat: 61.72744,
	lng: 15.62597
};
var mapOptions = {
	zoom: zoom,
	maxZoom: 13,
	minZoom: 2,
	center: mapCenter,
	backgroundColor: '#E1E1E1',
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map = new google.maps.Map(mapDiv, mapOptions);

function setMarker(pos, title) {
	var marker = new google.maps.Marker({
		position: pos,
		map: map,
		title: title
	});
	markers.push(marker);
}

function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setMapOnAll(null);
}

function showMarkers() {
	setMapOnAll(map);
}

function deleteMarkers() {
	clearMarkers();
	markers = [];
}
setMarker(stockholm, 'Stockholm');
setMarker(falun, 'Falun');
setMarker(are, 'Åre');

/* Using Haversine Formula to calculate the midpoint between two positions */
if (typeof(Number.prototype.toRad) === "undefined") {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
}

if (typeof(Number.prototype.toDeg) === "undefined") {
	Number.prototype.toDeg = function() {
		return this * (180 / Math.PI);
	}
}

function calculateMidpoint(lat1, lng1, lat2, lng2) {
	var dLng = (lng2 - lng1).toRad();

	lat1 = lat1.toRad();
	lat2 = lat2.toRad();
	lng1 = lng1.toRad();

	var bX = Math.cos(lat2) * Math.cos(dLng);
	var bY = Math.cos(lat2) * Math.sin(dLng);
	var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
	var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);
	lat3 = lat3.toDeg();
	lng3 = lng3.toDeg();

	var center = new google.maps.LatLng(lat3, lng3);

	map.panTo(center);
}

/* Using Haversine Formula to calculate the distance between two postions */
function calculateDistance(lat1, lng1, lat2, lng2) {
	var R = 6371; //Jordens radie i km

	var dLat = (lat2 - lat1).toRad();
	var dLng = (lng2 - lng1).toRad();

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var distance = R * c;

	console.log(distance);

	return distance;
}

function setZoom(distance) {
	var _zoom = 4;

	if (distance < 50) {
		_zoom = 10;
	} else if (distance < 100) {
		_zoom = 9;
	} else if (distance < 255) {
		_zoom = 8;
	} else if (distance < 500) {
		_zoom = 7;
	} else if (distance < 700) {
		_zoom = 6;
	} else if (distance < 1000) {
		_zoom = 5;
	} else if (distance < 2000) {
		_zoom = 5;
	} else if (distance > 5600) {
		_zoom = 3;
	}
	if (distance > 9500) {
		_zoom = 2;
	}

	console.log(_zoom);
	map.setZoom(_zoom);
}

/* convert minutes into hours and minutes */
function convertTime(n) {
	var num = n;
	var hours = (num / 60);
	var rhours = Math.floor(hours);
	var minutes = (hours - rhours) * 60;
	var rminutes = Math.round(minutes);
	if (rhours > 0 && rminutes > 0) {
		return rhours + " h " + rminutes + " min";
	} else if (rhours > 0 && rminutes == 0) {
		return rhours + " h";
	} else
		return rminutes + " min";
}