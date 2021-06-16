import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utils } from './services/utils.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onBuildLocation = onBuildLocation;
window.onCloseModal = onCloseModal;
window.onGo = onGo;
window.onDelete = onDelete;
window.onSearchPlace = onSearchPlace;

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
    locService.initLocations()
    renderLocations()
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onBuildLocation(ev, elForm) {
    ev.preventDefault();
    document.querySelector('.modal').hidden = true;
    const locName = elForm.querySelector('input').value;
    locService.buildLocation(locName, gLatLang.lat, gLatLang.lang);
    renderLocations();
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

    renderLocations()
}


function renderLocations() {
    let locs = locService.getLocs()
    let strHtml = `<tbody>`

    locs.forEach(loc => {
        strHtml += `<tr> <td>${loc.name}</td> <td> </td><button } onclick="onGo('${loc.id}')">go</button> <td> </td><button onclick="onDelete('${loc.id}')">delete</button></tr>`
    })
    strHtml += '</tbdoy>'
    document.querySelector('.locs').innerHTML = strHtml
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

function onGo(id) {
    let locs = locService.getLocs()

    let currentLocIdx = locs.findIndex(loc => loc.id === id)
    mapService.panTo(locs[currentLocIdx].lat, locs[currentLocIdx].lng)
}

function onSearchPlace() {
    // utils.debounce(function() {  }, 1000)
    mapService.SearchPlace()

}

function onDelete(id) {
    locService.deleteLocation(id)
    renderLocations()
}

function onPanTo(lat, lang) {
    mapService.panTo(lat, lang);
}