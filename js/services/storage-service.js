'use strict'

export const storageService = { loadFromStorage, saveToStorage }

function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var data = JSON.parse(json)
    return data;
}

function saveToStorage(key, data) {
    var json = JSON.stringify(data);
    localStorage.setItem(key, json)
}