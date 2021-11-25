var rp = require('request-promise');

module.exports = (url) => {

    var p = new Promise((resolve, reject) => {
        if (url !== 'http://localhost:3001/test') {
            reject(Error('url is wrong'))
        } else {
            rp(url).then(data => resolve(data));
        }
    })
    
    return p;
}