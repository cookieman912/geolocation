'use strict'

export const utils = {
    makeId,
    debounce
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function debounce(func, wait) {
    let timeout;
    console.log(func);

    return function(...args) {
        const later = () => {
            clearTimeout(timeout);

            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};