const express = require('express');
const db = require('../data/category');
const category = express.Router();

category.get('/', (req, res, next) => {
    db.getAll((error, success) => {
        if(error){
            res.status(500).send(error);
            throw new Error(error);
        } else {
            res.json(success);
        }
        next();
    });
})

category.get('/:id', (req, res, next) => {
    const { id } = req.params;

    db.getById(id, (error, success) => {
        if(error){
            res.status(500).send(error);
            throw new Error(error);
        } else {
            res.json(success);
        }
        next();
    });
})

category.post('/', (req, res, next) => {
    const { category } = req.body;

    db.post(category, (error,success) => {
        if(error){
            res.status(500).send(error);
            throw new Error(error);
        } else {
            res.status(201).json(success);
        }
        next();
    });
});

category.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    db.delete(id, (error, success) => {
        if(error){
            res.status(500).send(error);
            throw new Error(error);
        } else {
            res.status(204).json(success);
        }
        next();
    });
});

module.exports = category;