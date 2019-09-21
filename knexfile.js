// Update with your config settings.
const secrets = require('./secrets/secrets');


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/replate.sqlite3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn,done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory : './data/migrations'
    },
    seeds : {
      directory : './data/seeds'
    },
  },


  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'postgres',
      user:     'postgres',
      password: '$dataYunas1!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
};
