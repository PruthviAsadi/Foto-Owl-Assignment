const express = require('express');
const { createBorrowRequest } = require('../controllers/borrowRequestController');
const router = express.Router();

router.post('/', createBorrowRequest);

module.exports = router;
