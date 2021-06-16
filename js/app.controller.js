import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
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
                document.querySelector('.modal').hidden = false;
            })
        })
        .catch((err) => console.log(err));
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onBuildLocation(ev, elForm) {
    ev.preventDefault();
    document.querySelector('.modal').hidden = true;
    const locName = elForm.querySelector('input').value;
    locService.buildLocation(locName, gLatLang.lat, gLatLang.lang);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
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