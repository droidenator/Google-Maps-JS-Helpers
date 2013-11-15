var buster = {
	markers: {},
	infoWindow: null,
	map: null,
	mapId: null,
	timeout: null,
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
 * @param {boolean} Whether or not to create the infowindow object
 */
buster.init = function(mapId, center, createInfo){
	this.mapId = mapId;
	this.center = center;

	google.maps.event.addDomListener(window, 'load', function(){
        buster.createMap(createInfo);
    });
}

/**
 * Create map and set center
 */
buster.createMap = function(createInfo){
	//Create map using supplied ID
	buster.map = new google.maps.Map(document.getElementById(buster.mapId), buster.mapOptions);
	
	//Set center. @TODO - add support for using current location or geocoding of supplied address
	var pos = new google.maps.LatLng(buster.center.lat, buster.center.lng);
	buster.map.setCenter(pos);

    //Create info window
    if(createInfo) buster.infoWindow = new google.maps.InfoWindow();
}

/**
 * Adds a marker to a map.
 *
 * @param {object} - location object containing lat, lng, name
 * @returns {number} - Returns the key for later accessing the marker object
 */
buster.addMarker = function(location){
    if(!buster.initCheck(buster.addMarker, location)) return -1;

    var markerPos = new google.maps.LatLng(location.lat, location.lng);
    var key = buster.objLength(buster.markers);

    buster.markers[key] = new google.maps.Marker({
        position: markerPos,
        map: buster.map,
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


/**
 * Checks to verify a map has been created; calls the specified function and arg at the end of timeout
 * @TODO - better method would be check map's status and, if not created, bind function to the map's event listener
 *
 * @param func - function to be called
 * @param arg - arguments to be supplied to argument
 * @returns {boolean}
 */
buster.initCheck = function(func, arg){
    if(buster.map == null){
        if(buster.timeout == null){
            buster.timeout = setTimeout(function(){
            	func(arg);
            }, 200);
        }
        return false;
    }
    return true;
}