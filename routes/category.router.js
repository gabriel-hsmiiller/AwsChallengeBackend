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

category.post('/', (req, res, next) => {
    const { category } = req.body;

    db.post(category, (error,success) => {
        if(error){
            res.status(500).send({
                message: error
            });
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

module.exports = category;