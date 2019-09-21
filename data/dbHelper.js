const db = require('./dbConfig');

module.exports = {
    getAll
}

function getAll(table) {
   return db.select('*').from(table);
}



