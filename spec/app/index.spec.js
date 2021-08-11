const request = require('request');
const baseUrl = 'http://localhost:3003'

describe('index.js', () => {
    it('should return status 200 when get base url', (done) => {
        request.get(baseUrl, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});