const config = require('../config.db.json');
const mysql = require('mysql');

const { database,host,password,port,user } = config.connection;
const connection = mysql.createConnection({host, port, password, user, database})

connection.connect((err) => {
    if(err) throw err;
})

module.exports = connection;