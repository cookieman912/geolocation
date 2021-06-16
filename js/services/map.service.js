import { locService } from './loc.service.js'
export const mapService = {
    initMap,
    addMarker,
    panTo,
    panToUserLocation,
    showLocation,
    SearchPlace,
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            return gMap
        })

}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAJUNAY5e9wCXW6MvoESH4N-WI0uNTm1zo'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function panToUserLocation() {
    console.log('panning to location');
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser.');
        return;
    }
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}

function SearchPlace() {
    locService.moveToTypedCoords(document.getElementById('search-location').value)

}