const request = require('request');
const baseUrl = 'http://localhost:3003';

describe('routes/device.router.js', () => {

    it('should return device list when get /', (done) => {
        request.get(`${baseUrl}/device`, (err, res, body) => {
            const parsedBody = JSON.parse(body);
            expect(res.statusCode).toBe(200);
            expect(parsedBody.data.content).toBeTruthy();
            done();
        });
    });

    describe('get with id', () => {
        let id;

        beforeEach((done) => {
            request.get(`${baseUrl}/device`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                id = parsedBody.data.content[0].Id;
                done();
            });
        });

        it('should return single device when get /:id', (done) => {
            request.get(`${baseUrl}/device/${id}`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(parsedBody.data.content).toBeTruthy();
                expect(parsedBody.data.content.Id).toBeTruthy();
                done();
            });
        });
    
        it('should return statusCode 404 when get /:id with invalid id', (done) => {
            request.get(`${baseUrl}/device/0`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(404);
                expect(parsedBody.data.content).not.toBeTruthy();
                done();
            });
        });
    });

    describe('post', () => {
        let device;

        beforeEach((done) => {
            request.get(`${baseUrl}/category`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                const Category = parsedBody.data.content[0].Id;
                const PartNumber = Math.floor(Math.random() * 4000);
                device = {
                    Color: 'Blue',
                    PartNumber,
                    Category
                }
                done();
            });
        });

        it('should register new device when post /', (done) => {
    
            request.post(`${baseUrl}/device`, { body: { device }, json: true }, (err, res, body) => {
                expect(res.statusCode).toBe(201);
                expect(body.data).toBeTruthy();
                done();
            });
        });

        it('should not register new device when post / with incorrect parameters', (done) => {
            device.Color = '0'.repeat(17);
            device.PartNumber = -1;
    
            request.post(`${baseUrl}/device`, { body: { device }, json: true }, (err, res, body) => {
                expect(res.statusCode).toBe(406);
                expect(body.data).not.toBeTruthy();
                done();
            });
        });

        it('should not register new device when post / with no body content', (done) => {
    
            request.post(`${baseUrl}/device`, { body: {}, json: true}, (err, res, body) => {
                expect(res.statusCode).toBe(400);
                expect(body.data).not.toBeTruthy();
                done();
            });
        });
    });

    describe('delete', () => {
        let id;

        beforeEach((done) => {
            request.get(`${baseUrl}/category`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                const Category = parsedBody.data.content[0].Id;
                const PartNumber = Math.floor(Math.random() * 4000);
                device = {
                    Color: 'Blue',
                    PartNumber,
                    Category
                }
                request.post(`${baseUrl}/device`, { body: { device }, json: true }, (err, res, body) => {
                    id = body.data.content.Id;
                    done();
                });
            });
        });

        it('should delete one device when delete /:id', (done) => {
            request.delete(`${baseUrl}/device/${id}`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(parsedBody.data.total).toBe(1);
                expect(parsedBody.message).toBe('Deleted');
                done();
            });
        });

        it('should not delete anything when delete /:id with invalid id', (done) => {
            request.delete(`${baseUrl}/device/0`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(parsedBody.data.total).toBe(0);
                expect(parsedBody.message).toBe('No content');
                done();
            });
        });
    });
});