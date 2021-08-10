const sql = require('../connect.db');
const fs = require('fs');

let categoryDB = function(category) {
    this.category = category;
}

categoryDB.getAll = (callback) => {
    const query = `SELECT * FROM awschallenge.category`;

    sql.query(query, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    })
}

categoryDB.getById = (id, callback) => {
    const query = `SELECT * FROM awschallenge.category WHERE Id = ?`;

    if(!id){
        callback('[ERROR]: No `id` parameter has been provided.');
        return;
    }

    sql.query(query, id, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res[0]);
        }
    });
}

categoryDB.post = (category, callback) => {
    const query = `INSERT INTO category SET ?`;

    if(!category || !(category.Name)){
        callback('[ERROR]: `category` parameter is invalid.');
        return;
    }

    sql.query(query, category, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    });
}

categoryDB.delete = (id, callback) => {
    const queryCheck = `SELECT * FROM device WHERE Category = ?`;
    const queryDelete = `DELETE FROM category WHERE Id = ?`;

    if(!id){
        callback('[ERROR]: No `id` parameter has been provided.');
        return;
    }

    sql.query(queryCheck, id, (err,res) => {
        if(err){
            callback(err);
        } else {
            if(res.length > 0){
                callback(`[ERROR]: Cannot delete category id \`${id}\`: one or more rows references category on database[device]`)
            } else {
                sql.query(queryDelete, id, (err, res) => {
                    if(err){
                        callback(err);
                    } else {
                        callback(null,res);
                    }
                });
            }
        }
    });

}

module.exports = categoryDB;