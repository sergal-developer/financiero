const PI = 3.141623;
const NAME = "HOME";
var jsonPinData = []; 
var externalDataIn = [
    {"lat":19.186677697957833,"lng":-98.5693359375, "type": "default" },
    {"lat":19.18286769123097,"lng":-98.56573104858398, "type": "find" },
    {"lat":19.179868262224076,"lng":-98.58856201171875, "type": "military" },
    {"lat":19.16941036639215,"lng":-98.56598854064941, "type": "agression" },
    {"lat":19.181975974799514,"lng":-98.53912353515625, "type": "military" },
    {"lat":19.195270155440387,"lng":-98.58607292175293, "type": "default" },
    {"lat":19.1621948420753,"lng":-98.5843563079834, "type": "operative" },
    {"lat":19.170545363939166,"lng":-98.55105400085449, "type": "military" },
    {"lat":19.17095071831164,"lng":-98.51646423339844, "type": "operative" },
    {"lat":19.19056867766461,"lng":-98.52762222290039, "type": "policecar" }];

var infoWindowApp;
var typesMarkers = {
    "default": "resources/svg/marker.svg",
    "agression": "resources/svg/marker-gun.svg",
    "operative": "resources/svg/marker-operative.svg",
    "find": "resources/svg/marker-find.svg", 
    "policecar": "resources/svg/marker-policecar.svg",
    "military": "resources/svg/marker-military.svg",  
}

window.onload = function() {
    var hc
    if(window.google) {
        console.log("window.google", window.google)
        setTimeout(function() {
            hc = new HomeController().setupMap();
        }, 1000);
    }
}

class HomeController {
    constructor($timeout) {
        this.NameControler = "";
        this.version = "1.524";
        this.keyworks = "";
        this.currentSection = "";
        this.temporalSection = "";
        this.map; 
        this.pindata = [];
        this.autocomplete;
        this.$autocomplete = $("#googleAutocomplete");
        this.country = "es_MX";
        
        this.goSection('maps-section');
    }

    setupMap() {
        window.map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {lat: 22.8314554, lng: -101.2839785},
            zoom: 5
        });
        this.styleMap();

        google.maps.event.addListener(window.map, 'click', (e) => {
            this.addMarkerMap(e.latLng);
        });

        this.enableAutocomplete();

        this.loadIncidences();
    }

    addMarkerMap(location, type) {
        type = type || "default";

        var icon = typesMarkers[type];

        if(location) {
            let marker = new google.maps.Marker({
                position: location,
                map: window.map,
                name: "Balacera",
                icon: icon
            });
            this.addEventsMarker(marker);
            jsonPinData.push(this.getLatLng(location));
        }
    }

    addEventsMarker(marker) {
        infoWindowApp = new google.maps.InfoWindow();
        
        google.maps.event.addListener(marker, 'click', () => {
            // this.goNotification();
            infoWindowApp.setContent($(".infoWindowApp")[0].outerHTML);
            infoWindowApp.open(window.map, marker);
        });
    }

    getLatLng(location) {
		let pos = {
			lat: location.lat(),
			lng: location.lng()
		};
		return pos;
    };

    styleMap() {

        var styles = [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#bdbdbd"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#ffffff"
                }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dadada"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#c9c9c9"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            }
            ];
        window.map.setOptions({styles: styles});
    }

    goSection(section) {
       if(section) {
            $(".layer").removeClass("active");
            $(".layer." + section).addClass("active");
            this.currentSection = section;
       }
    }
    goSectionDetails(id) {
       if(id) {
            $(".layer").removeClass("active");
            $(".layer.details-section").addClass("active");
       }
    }

    goNotification() {
        if(!$(".app-viewport-lateral").hasClass("active")) {
            $(".app-viewport-lateral").addClass("active");
            $(".background-app-viewport").addClass("active");
            this.pindata = jsonPinData;
            console.log('this.pindata: ', JSON.stringify(jsonPinData));
        } else {
            $(".app-viewport-lateral").removeClass("active");
            $(".background-app-viewport").removeClass("active");
        }

        
    }

    goSearch() {
        // if(this.keyworks.length > 5) {
        //     this.temporalSection = this.currentSection;
        // } else {
        //     this.goSection(this.temporalSection);
        // }

        // if(this.keyworks.length < 5 && this.temporalSection) {
        //     this.goSection(this.temporalSection);
        //     if(window.map) {
        //         google.maps.event.trigger(window.map, "resize");
        //     }
        // } 
    }

    enableAutocomplete() {
        // Autocomplete event
		this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('googleAutocomplete'));
			// { componentRestrictions: { country: this.country } });

		this.autocomplete.bindTo('bounds', window.map);
		/* istanbul ignore next */
		this.autocomplete.addListener('place_changed', () => {
			let place = this.autocomplete.getPlace();

			if (!place.geometry) {
				this.$autocomplete.blur();
				return;
			} else {
                this.goSection('maps-section');
				this.$autocomplete.blur();
				let position = this._fitViewportPlace(place);
				let pos = {
					lat: position.lat(),
					lng: position.lng()
				};

                
			}
		});
    }

    _fitViewportPlace(place) {
		if (place.geometry.viewport) {
			window.map.fitBounds(place.geometry.viewport);
			// window.map.setZoom(this.zoom);
		} else {
			window.map.setCenter(place.geometry.location);
			window.map.setZoom(14);
		}
	}

    loadIncidences() {
        if(externalDataIn && window.map) {
            for(let i in externalDataIn) {
                let p = new google.maps.LatLng(externalDataIn[i].lat, externalDataIn[i].lng);
                this.addMarkerMap(p, externalDataIn[i].type);
            }
        }
    }
}

HomeController.$inject = ['$timeout'];

export default HomeController;