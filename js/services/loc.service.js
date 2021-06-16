const LOC_API_KEY = 'AIzaSyA3iKCO8Ce293puSh0B4twj3mpPUhG85-Q'
const LOCATIONS_DB_KEY = 'locationsDB'
import { storageService } from './storage-service.js'
import { utils } from './utils.js'
export const locService = {
    getLocs,
    buildLocation
}

let locations = []


function getLocs() {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locations[0].lat},${locations[0].lng}&key=${LOC_API_KEY}`)

    .then(res => res.data.results)
        .then(locations => { return locations; })


    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(locs);
    //     }, 2000)
    // });
}

function buildLocation(name, lat, lng, ) {
    locations.push({ id: utils.makeId(), name, lat, lng, weather, createdAt: Date.now(), updatedAt: Date.now() })
    storageService.saveToStorage(LOCATIONS_DB_KEY, locations)
}