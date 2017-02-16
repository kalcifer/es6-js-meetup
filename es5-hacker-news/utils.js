var P = require('bluebird');
function makeRequest(method, url) {
    return new P(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(xhr.response);
        };
        xhr.send();
    });
}

module.exports = makeRequest;
