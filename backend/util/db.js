const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'okopi',
    password: '',
    database: 'pern_chat',
    port: 5432,
    host: 'localhost',
});

module.exports = pool;