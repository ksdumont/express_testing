const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /generate endpoint', () => {
    it('should generate an array of 5', () => {
        return supertest(app)
        .get('/generate') // invoke the endpoint
        .query({n: 5}) // send the query string ?n=5
        .expect(200) // assert that you get a 200 OK status
        .expect('Content-Type', /json/)
        .then(res => {
            // make sure you get an array
            expect(res.body).to.be.an('array');
            // array must not be empty
            expect(res.body).to.have.lengthOf.at.least(1);
            // asserts that it includes 5, will still pass if n = 6. but .have is stricter, will
            // ensure that the values are the only ones present, will not pass if n = 6
            expect(res.body).to.include.members([1, 2, 3, 4, 5]);
            // stricter test: must have these 5 and only these 5
            expect(res.body).to.be.an('array').that.have.members([1,2,3,4,5]);
        });
    })
});