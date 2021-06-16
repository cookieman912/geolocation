import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGo = onGo;
window.onDelete = onDelete;
window.onSearchPlace = onSearchLocation;
window.onBuildLocation = onBuildLocation;
window.onCloseModal = onCloseModal;

var gLatLang;



function onInit() {
    mapService.initMap()
        .then(map => {
            map.addListener("click", (mapsMouseEvent) => {
                gLatLang = {
                    lat: mapsMouseEvent.latLng.lat(),
                    lang: mapsMouseEvent.latLng.lng()
                };
                onPanTo(gLatLang.lat, gLatLang.lang);
                console.log(mapsMouseEvent.latLng.lat());
                console.log(mapsMouseEvent.latLng.lng());
            })
        })
        .catch((err) => console.log(err));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)

    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            document.querySelector('.locs').innerText = JSON.stringify(locs[0].formatted_address)


        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            mapService.showLocation(pos);
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat, lang) {
    mapService.panTo(lat, lang);
}

function onMyLocation() {
    mapService.panToUserLocation();
}

function onGo() {
    onPanTo(gLatLang.lat, gLatLang.lang);
}


function onDelete(el) {
    console.log(el);
    locService.deleteLocation(el.id)
}

function onSearchLocation() {
    console.log('searching', document.getElementById('search-location').value);
    mapservice.SearchPlace()
}