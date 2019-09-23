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

    switch (table) {
        case 'pickups':
            return db.select('*').from(table).where({restaurant_id: id.restID, volunteer_id: id.volID});
        default : 
            return db.select('*').from(table).where('id',id).first()
    }

    // if (table === 'pickups') {
    //     return db.select('*').from(table).where({restaurant_id: id.restID, volunteer_id: id.volID})
    //     // return db.raw(`select * from pickups where restaurant_id = ${id.restID} and volunteer_id = ${id.volID}`)
    // }
    
    // return db.select('*').from(table).where('id',id).first()
}

function add(table, data) {

    const idObj = {restID : data.restaurant_id, volID : data.volunteer_id};

    switch(table) {
        case 'pickups':
            return db(table).insert(data)
            .then(([last]) => {
                console.log('added', last);
                return getOne(table,idObj)
            })

        default : 
            return db(table).insert(data)
            .then( ([id]) => {
                console.log('added', id);
                return getOne(table,id);
            })
    }
    
}

function modify(table,id,data) {
    console.log('data in modify', data);
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
   console.log('id in delete', id);
   return db(table).del().where('id',id)
}




