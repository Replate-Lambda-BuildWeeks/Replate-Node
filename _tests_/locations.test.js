const supertest = require('supertest');
const server = require('../server');
const mockRequest = supertest(server);

test('add location', async () => {
    const newSpot = {location: 'bingo land'};
    const added = mockRequest.post('/locations').send(newSpot);
    expect(added.status).toBe(201);
})

