const server = require('./server');

const port = process.env.PORT || 7777;

server.listen(port, () => {
    console.log(`\n***rePlate API server listening on port ${port}***\n`);
})

