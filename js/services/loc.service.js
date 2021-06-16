const LOC_API_KEY = 'AIzaSyA3iKCO8Ce293puSh0B4twj3mpPUhG85-Q'
const LOCATIONS_DB_KEY = 'locationsDB'
import { storageService } from './storage-service.js'
import { utils } from './utils.js'
import { mapService } from './map.service.js'
export const locService = {
    getLocs,
    buildLocation,
    deleteLocation,
    moveToTypedCoords: moveToTypedCoords,
    initLocations,
}

var locations;

function initLocations() {
    locations = storageService.loadFromStorage(LOCATIONS_DB_KEY);
    if (!locations)
        locations = []
}

function getLocs() {
    return locations;
    // return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locations[0].lat},${locations[0].lng}&key=${LOC_API_KEY}`)
    // .then(res => res.data.results)
    //     .then(locations => { return locations; })
}

function buildLocation(name, lat, lng) {
    locations.push({
        id: utils.makeId(),
        name,
        lat,
        lng,
        weather: 'partly clouded 22°',
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    storageService.saveToStorage(LOCATIONS_DB_KEY, locations)
}

function deleteLocation(id) {
    var deletedIdx = locations.findIndex(location => id === location.id)
    locations.splice(deletedIdx, 1)
    storageService.saveToStorage(LOCATIONS_DB_KEY, locations)
}

function moveToTypedCoords(input) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${LOC_API_KEY}`)
        .then(res => { mapService.panTo(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng) });

}