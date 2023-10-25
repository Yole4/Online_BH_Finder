const express = require('express');
const { createMessage, getMessage } = require('../controllers/messageController');

const router = express.Router();
const {verifyToken} = require('../utils/auth/AuthVerify');

router.post('/', verifyToken, createMessage);
router.get('/:conversationId', verifyToken, getMessage);

module.exports = router;