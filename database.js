const pg = require('pg');

const connection = new pg.Pool({
    user: 'ugrwbdnu',
    password: '0rurj4Wl7w1cFeYLiwsK_u7zK2Zdox3c',
    host: 'john.db.elephantsql.com',
    database: 'ugrwbdnu',
});

module.exports = connection;
