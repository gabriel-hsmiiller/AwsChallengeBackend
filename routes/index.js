const express = require('express');
const router = express();

router.use('/device', require('./device.router'));
router.use('/category', require('./category.router'));

module.exports = router;