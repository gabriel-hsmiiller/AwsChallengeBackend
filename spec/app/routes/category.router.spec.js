const request = require('request');
const baseUrl = 'http://localhost:3003';

describe('routes/category.router.js', () => {
    
    it('should return category list when get /', (done) => {
        request.get(`${baseUrl}/category`, (err, res, body) => {
            const parsedBody = JSON.parse(body);
            expect(res.statusCode).toBe(200);
            expect(parsedBody.data.content).toBeTruthy();
            done();
        });
    });

    
    describe('get with id', () => {
        let id;

        beforeEach((done) => {
            request.get(`${baseUrl}/category`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                id = parsedBody.data.content[0].Id;
                done();
            });
        });

        it('should return single category when get /:id', (done) => {
            request.get(`${baseUrl}/category/${id}`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(parsedBody.data.content).toBeTruthy();
                expect(parsedBody.data.content.Id).toBeTruthy();
                done();
            });
        });
    
        it('should return statusCode 404 when get /:id with invalid id', (done) => {
            request.get(`${baseUrl}/category/0`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(404);
                expect(parsedBody.data.content).not.toBeTruthy();
                done();
            });
        });
    });

    describe('post', () => {
        let category;

        beforeEach((done) => {
            category = {
                Name: `Some test ${Math.floor(Math.random() * 4000)}`
            }
            done();
        });

        it('should register new category when post /', (done) => {
    
            request.post(`${baseUrl}/category`, { body: { category }, json: true }, (err, res, body) => {
                expect(res.statusCode).toBe(201);
                expect(body.data).toBeTruthy();
                done();
            });
        });

        it('should not register new category when post / with incorrect parameters', (done) => {
            function randomChar(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
               return result;
            }
            
            category.Name = randomChar(130);
    
            request.post(`${baseUrl}/category`, { body: { category }, json: true }, (err, res, body) => {
                expect(res.statusCode).toBe(406);
                expect(body.data).not.toBeTruthy();
                done();
            });
        });

        it('should not register new category when post / with no body content', (done) => {
    
            request.post(`${baseUrl}/category`, { body: {}, json: true}, (err, res, body) => {
                expect(res.statusCode).toBe(400);
                expect(body.data).not.toBeTruthy();
                done();
            });
        });
    });

    describe('delete', () => {
        let id;

        beforeEach((done) => {
            const category = {
                Name: `Some test ${Math.floor(Math.random() * 4000)}`
            }
            request.post(`${baseUrl}/category`, { body: { category }, json: true }, (err, res, body) => {
                id = body.data.content.Id;
                done();
            });
        });

        it('should delete one category when delete /:id', (done) => {
            request.delete(`${baseUrl}/category/${id}`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(parsedBody.data.total).toBe(1);
                expect(parsedBody.message).toBe('Deleted');
                done();
            });
        });

        it('should not delete anything when delete /:id with invalid id', (done) => {
            request.delete(`${baseUrl}/category/0`, (err, res, body) => {
                const parsedBody = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(parsedBody.data.total).toBe(0);
                expect(parsedBody.message).toBe('No content');
                done();
            });
        });
    });
});