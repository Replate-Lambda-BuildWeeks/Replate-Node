const db = require('./dbConfig');
const bcrypt = require('bcryptjs');


module.exports = {
    getAll,
    getOne,
    add, 
    modify,
    remove,
    login
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

    switch(table) {
        case 'pickups':
            const idObj = {restID : data.restaurant_id, volID : data.volunteer_id};
            return db(table).insert(data)
            .then(([last]) => {
                console.log('added', last);
                return getOne(table,idObj)
            })
        case 'users':


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
        return db(table).del().where({restaurant_id : id.restID, volunteer_id: id.volID })
       
       default : 
        return db(table).del().where('id',id)
   }
}

async function login(credentials) {

    const user = await db.select('*').from('users').where({username: credentials.username}).first();
    
    if (!user) {
        return null;
    }
    const hash = user.password;
 
    console.log('user', user, 'hash', hash);

    if (bcrypt.compareSync(credentials.password, hash)) {
        return user;
    } else {
        return null;
    }
    // return db.select('*').from('users').where({username: credentials.username, password: credentials.password})
}




