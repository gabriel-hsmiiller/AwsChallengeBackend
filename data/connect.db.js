const mysql = require('mysql');
require('dotenv').config();

const { database,host,password,port,user } = process.env;
const connection = mysql.createConnection({host, port, password, user, database})

connection.connect((err) => {
    if(err) throw err;
})

module.exports = connection;