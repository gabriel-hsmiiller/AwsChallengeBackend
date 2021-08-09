const express = require('express');
const device = express.Router();

device.get('/', (req, res, next) => {
    res.send({ msg: 'Ok' });
})

module.exports = device;