const sql = require('../connect.db');
const fs = require('fs');

let categoryDB = function(category) {
    this.category = category;
}

categoryDB.getAll = (callback) => {
    const query = fs.readFileSync('./SELECT_ALL.sql').toString();

    sql.query(query, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    })
}

categoryDB.getById = (id, callback) => {
    const query = fs.readFileSync('./SELECT_BY_ID.sql').toString();

    if(!id){
        callback('[ERROR]: No `id` parameter has been provided.');
        return;
    }

    sql.query(query, id, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    });
}

categoryDB.post = (category, callback) => {
    const query = fs.readFileSync('./INSERT.sql').toString();

    if(!category || !(category.Name)){
        callback('[ERROR]: `category` parameter is invalid.');
        return;
    }

    sql.query(query, [category.Name], (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    });
}

categoryDB.delete = (id, callback) => {
    const query = fs.readFileSync('./DELETE.sql').toString();

    if(!id){
        callback('[ERROR]: No `id` parameter has been provided.');
        return;
    }

    sql.query(query, id, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    });
}

module.exports = categoryDB;