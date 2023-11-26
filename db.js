const Pool = require('pg').Pool;
const pool = new Pool({
    user:"playabook",
    password:"8896",
    host:"localhost",
    database:"clublink",
    port:5432
});

module.exports = pool;