const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/checkAuth.js')
const { addComment, getComments } = require('../controller/comment.js');


router.post('/addComment/:id', authenticateToken, addComment);

router.get('/getComments/:id', getComments);

module.exports = router;
