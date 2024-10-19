const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/checkAuth.js')
const { addAddress, getAddress } = require('../controller/address.js')


router.post('/addAddress', authenticateToken, addAddress)

router.get('/getAddress', authenticateToken, getAddress)

module.exports = router;
