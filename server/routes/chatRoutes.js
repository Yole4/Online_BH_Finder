const express = require('express');
const { createChat, findUserChat, findSingleChat } = require('../controllers/chatController');

const router = express.Router();
const {verifyToken} = require('../utils/auth/AuthVerify');

// chat
router.post('/', verifyToken, createChat);
router.get('/:userId', verifyToken, findUserChat);
router.get('/find/:firstUser/:secondUser', verifyToken, findSingleChat);

module.exports = router;