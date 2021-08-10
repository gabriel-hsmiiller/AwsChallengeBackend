const sql = require('../connect.db');
const fs = require('fs');

let deviceDB = function(device) {
    this.device = device;
}

deviceDB.getAll = (callback) => {
    const query = `SELECT * FROM awschallenge.device`;

    sql.query(query, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    })
}

deviceDB.getById = (id, callback) => {
    const query = `SELECT * FROM awschallenge.device WHERE Id = ?`;

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

deviceDB.post = (device, callback) => {
    const query = `INSERT INTO device SET ?`;

    if(!device || !(device.Color && device.PartNumber && device.Category)){
        callback('[ERROR]: `device` parameter is invalid.');
        return;
    }

    sql.query(query, device, (err, res) => {
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    });
}

deviceDB.delete = (id, callback) => {
    const query = `DELETE FROM device WHERE Id = ?`;

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

module.exports = deviceDB;