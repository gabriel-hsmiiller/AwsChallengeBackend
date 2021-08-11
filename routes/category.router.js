const express = require('express');
const db = require('../data/category');
const category = express.Router();

category.get('/', (req, res, next) => {
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
});

category.get('/:id', (req, res, next) => {
    const { id } = req.params;

    db.getById(id, (error, success) => {
        if(error){
            res.status(500).send({
                message: error
            });
        } else {
            if(!success){
                res.status(404).json({
                    message: 'Not found',
                    data: {
                        total: 0,
                        content: null
                    }
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
        }
        next();
    });
});

category.post('/', (req, res, next) => {
    const { category } = req.body;

    if(!category){
        res.status(400).send({
            message: 'Data not provided.'
        });
        return;
    }

    if(category?.Name.length > 128){
        res.status(406).send({
            message: '`Name` length is too long.'
        });
        return;
    }

    db.post(category, (error,success) => {
        if(error){
            {
                res.status(500).send({
                    message: error.sqlMessage
                });
            }
        } else {
            const content = { ...category, Id: success.insertId };
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

category.delete('/:id', (req, res, next) => {
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
            res.status(200).json({
                message: success.affectedRows > 0 ? 'Deleted' : 'No content',
                data: {
                    total: success.affectedRows,
                    content: success
                }
            });
        }
        next();
    });
});

module.exports = category;