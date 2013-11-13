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

/**
 * Adds a marker to a map.
 *
 * @param {object} - location object containing lat, lng, name
 * @returns {number} - Returns the key for later accessing the marker object
 */
buster.addMarker = function(location){
    var markerPos = new google.maps.LatLng(location.lat, location.lng);
    var key = this.objLength(this.markers);

    this.markers[key] = new google.maps.Marker({
        position: markerPos,
        map: this.map,
        title: location.name
    });

    //TODO - Add support for content handling

    return key;
}

/**
 * Returns the length of an object
 *
 * @param obj
 * @returns {number}
 */
buster.objLength = function(obj){
    if(Object.keys){
        return +Object.keys(obj).length;
    } else {
        var length = 0;
        for( var key in obj){
            if(obj.hasOwnProperty(key)) length++;
        }
        return +length;
    }
}