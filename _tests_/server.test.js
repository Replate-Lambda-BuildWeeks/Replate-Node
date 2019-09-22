const supertest = require('supertest');
const server = require('../server');
const {isEmpty} = require('../utils/utilities');


const superRequest = supertest(server);

describe('locations', () => {
    it('get locations', async () => {
        const locations = await superRequest.get('/locations');
        expect(locations.body.length).toBe(3);
    })

    it('get 1 location', async () => {
        const location = await superRequest.get('/locations/1');
        expect(location.status).toBe(200);
    })

    it('wrong location id', async () => {
        const missingloc = await superRequest.get('/locations/1000000');
        expect(missingloc.status).toBe(404);
    })

    it('wrong location url', async () => {
        const wrongloc = await superRequest.get('/locate/');
        expect(wrongloc.status).toBe(500);
    })

    it('get restaurants', async () => {
        const restaurants = await superRequest.get('/restaurants');
        expect(restaurants.body.length).toBe(3);
    })
})

    test('isEmpty true', () => {
        const obj = {key: 1, key2: 2, key3: 3};
        expect(isEmpty(obj)).toBe(false);
    });

    test('isEmpty false', () => {
        const obj = {};
        expect(isEmpty(obj)).toBe(true);
    })
