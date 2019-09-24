module.exports = {
    port : process.env.PORT || 7777,
    nodeEnv: process.env.NODE_ENV || 'development',
    pg_pass: process.env.PG_PASS,
    rds_connection: process.env.RDS_CONNECTION || '127.0.0.1',
    DATABASE_URL: process.env.DATABASE_URL,
    jwt_secret : process.env.JWT_SECRET
}



