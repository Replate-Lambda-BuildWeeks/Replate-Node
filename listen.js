require('dotenv').config();
const server = require('./server');
const secrets = require('./secrets/secrets');

server.listen(secrets.port, () => {
    console.log(`\n***rePlate API server listening on port ${secrets.port}***\n`);
})