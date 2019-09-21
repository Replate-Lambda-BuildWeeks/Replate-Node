const supertest = require('supertest');
const server = require('../server');

const superRequest = supertest(server);

describe('endpoints', () => {
    it('get locations', async () => {
        const locations = await superRequest.get('/locations');
        expect(locations.body.length).toBe(3);
    })

    it('get restaurants', async () => {
        const restaurants = await superRequest.get('/restaurants');
        expect(restaurants.body.length).toBe(4);
    })
})
