const express = require('express');
const db = require('../data/device');
const device = express.Router();

device.get('/', (req, res, next) => {
    db.getAll((error, success) => {
        if(error){
            res.status(500).send({
                message: error
            });
        } else {
            res.json({
                message: 'Ok',
                data: {
                    total: success.length,
                    content: success
                }
            });
        }
        next();
    });
})

device.get('/:id', (req, res, next) => {
    const { id } = req.params;

    db.getById(id, (error, success) => {
        if(error){
            res.status(500).send({
                message: error
            });
        } else {
            res.json({
                message: 'Ok',
                data: {
                    total: success ? 1 : 0,
                    content: success ?? null
                }
            });
        }
        next();
    });
});

device.post('/', (req, res, next) => {
    const { device } = req.body;

    if(!device){
        res.status(400).send({
            message: 'Data not provided.'
        });
        return;
    }
    
    if(/[0-9]+/gm.test(device.Color)){
        res.status(406).send({
            message: '`Color` cannot contain numbers.'
        });
        return;
    }
    
    if(Math.abs(Number(device.PartNumber)) !== Number(device.PartNumber)){
        res.status(406).send({
            message: '`PartNumber` must be positive'
        });
        return;
    }

    db.post(device, (error,success) => {
        if(error){
            res.status(500).send({
                message: error.sqlMessage
            });
        } else {
            const content = { ...device, Id: success.insertId };
            res.status(201).json({
                message: 'Created',
                data: {
                    total: 1,
                    content
                }
            });
        }
        next();
    });
});

device.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    if(!id){
        res.status(400).send({
            message: 'ID not provided.'
        });
        return;
    }

    db.delete(id, (error, success) => {
        if(error){
            res.status(500).send({
                message: error
            });
        } else {
            res.status(204).json({
                message: 'Deleted',
                data: {
                    total: 1,
                    content: success
                }
            });
        }
        next();
    });
});

module.exports = device;