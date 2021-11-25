const callback = require('./callback');

test('Testing Call Back With Error', (done) => {

    callback('http://localhost:3001/ping', (err) => {
        
        expect(err).toEqual(Error("url is wrong"));
        done();
    })
});

test('Should return data', (done) => {

    callback('http://localhost:3001/ping', (err, data) => {
        
        expect(data).toStrictEqual('ping');
        done();
    })
});