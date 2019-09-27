const db = require('./dbConfig');
const bcrypt = require('bcryptjs');


module.exports = {
    getAll,
    getById,
    getPickups,
    getByFood,
    add, 
    modify,
    remove,
    login
}

function getAll(table) {
   return db.select('*').from(table);
}

function getPickups(table,id) {
    // return db.select('*').from(table).where({'restaurant_id' : id, 'volunteer_id' : null});
    return db.select('*').from(table).where({'restaurant_id' : id});
}

function getByFood(table,food) {
    return db.select('*').from(table).where('food',food);
}

function getById(table,id) {
    console.log(table,id, 'table and id in getById');
    switch (table) {
        case 'pickups':
              //from pickups table, its not really an id, its a food.
            // return db.select('*').from(table).where({restaurant_id: id.restID, volunteer_id: id.volID})
            return db.select('*').from(table).where({restaurant_id : id.restID, volunteer_id : id.volID});
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
            // const idObj = {restID : data.restaurant_id, volID : data.volunteer_id};
            return db(table).insert(data)
            .then(([last]) => {
                console.log('added', last);
                return getByFood(table,data.food)
            })

        default : 
            console.log('data in insert', data, table);
            return db(table).insert(data)
            .then( ([id]) => {
                console.log('added', id);
                return getById(table,id);
            })
    }
}

function modify(table,id,data) {

    console.log('data in modify', data, 'id', id);

    switch(table) {
        case 'pickups':
            console.log('modiy table case triggered in dbHelper');
            return db.select('*').from(table).where({volunteer_id: id.volID}).update(data).then(num => {
                console.log('num from database modiffy', num);
                if (num) {
                    return getById(table,id)
                } else {
                    return null;
                }
            })

        default : 
            return db.select('*').from(table).where('id',id).update(data)
            .then(num => {
                if (num) {
                    return getById(table,id)
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




