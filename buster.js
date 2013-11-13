var buster = {
	markers: {},
	infoWindow: null,
	map: null,
	mapId: null,
	center: {},
	mapOptions: {
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP	
	}
};

/**
 * Initialize google map variables and bind to window load
 *
 * @param {string} ID of DOM object to turn into a google map
 * @param {object} Contains lat and lng. Should be in format center.lat, center.lng. 
 */
buster.init = function(mapId, center){
	this.mapId = mapId;
	this.center = center;

	google.maps.event.addDomListener(window, 'load', buster.createMap);
}

/**
 * Create map and set center
 */
buster.createMap = function(){
	//Create map using supplied ID
	buster.map = new google.maps.Map(document.getElementById(buster.mapId), buster.mapOptions);
	
	//Set center. @TODO - add support for using current location or geocoding of supplied address
	var pos = new google.maps.LatLng(buster.center.lat, buster.center.lng);
	buster.map.setCenter(pos);	
}