const express = require('express');
const router = express.Router();
const createTableHandler = require('../database/createTable');

router.post('/', createTableHandler);

module.exports = router;
