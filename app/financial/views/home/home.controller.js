import apiService from '../../resources/services/api';

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
        this.getTypes();        
    }

    getTypes() {
        apiService.call('types', 'GET', null).then((data) => {
            console.log("data: ", data);
        })
    }

}

HomeController.$inject = ['$timeout'];

export default HomeController;