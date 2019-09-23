const db = require('./dbConfig');

module.exports = {
    getAll,
    getOne,
    add, 
    modify,
    remove
}

function getAll(table) {
   return db.select('*').from(table);
}

function getOne(table,id) {
    console.log(table,id);
    
    return db.select('*').from(table).where('id',id).first()
}

function add(table, data) {
    return db(table).insert(data)
    .then( ([id]) => {
        console.log(id);
        return getOne(table,id)
    })
}

function modify(table,id,data) {
    return db.select('*').from(table).where('id',id).update(data)
    .then(num => {
        if (num) {
            return getOne(table,id)
        } else {
            return null;
        }
    })
}

function remove (table,id) {
    console.log(table, 'table');
   return db(table).del().where({id})
}




