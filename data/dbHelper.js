const db = require('./dbConfig');
const bcrypt = require('bcryptjs');


module.exports = {
    getAll,
    getOne,
    getPickups,
    add, 
    modify,
    remove,
    login
}

function getAll(table) {
   return db.select('*').from(table);
}

function getPickups(table,id) {
    return db.select('*').from(table).where({'restaurant_id' : id, 'volunteer_id' : null});
}

function getOne(table,id) {
    console.log(table,id);

    switch (table) {
        case 'pickups':
            return db.select('*').from(table).where({restaurant_id: id.restID, volunteer_id: id.volID})
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

    switch(table) {
        case 'pickups':
            if (!data.volunteer_id) {
                data.volunteer_id = null;
            }
            const idObj = {restID : data.restaurant_id, volID : data.volunteer_id};
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
    console.log('data in modify', data, 'id', id);

    switch(table) {

        case 'pickups':
            console.log('modiy table case triggered in dbHelper');
            return db.select('*').from(table).where({restaurant_id: id.restID, volunteer_id: id.volID}).update(data).then(num => {
                if (num) {
                    return getOne(table,id)
                }
            })

        default : 
            return db.select('*').from(table).where('id',id).update(data)
            .then(num => {
                if (num) {
                    return getOne(table,id)
                } else {
                    return null;
                }
            })
            .catch(err => res.status(500).json(err.message));   
    }
}

function remove (table,id) {
   console.log(table, 'table');
   console.log('id in delete', id);

   switch (table) {
       case 'pickups' : 
       if (!id.volID) {
           id = {restID : id, volID : null}
           console.log(id);
       }
        return db(table).del().where({restaurant_id : id.restID, volunteer_id: id.volID })
       
       default : 
        return db(table).del().where('id',id)
   }
}

async function login(credentials) {

    const {username, password} = credentials;

    const volunteer = await db.select('*').from('volunteers').where({username}).first();
    
    if (volunteer) {
        const hash = volunteer.password;
        console.log('volunteer', volunteer, 'hash', hash);
        return bcrypt.compareSync(password, hash) && volunteer;
        
    } else {
        const restaurant = await db.select('*').from('restaurants').where({username}).first();
        
        if (restaurant) {
            const hash = restaurant.password;
            console.log('restaurant', restaurant, 'hash', hash);
            return bcrypt.compareSync(password, hash) && restaurant;
        }
    }   
}




