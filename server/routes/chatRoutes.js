const express = require('express');
const { createChat, findUserChat, findSingleChat } = require('../controllers/chatController');

const router = express.Router();

// chat
router.post('/', createChat);
router.get('/:userId', findUserChat);
router.get('/find/:firstUser/:secondUser', findSingleChat);

module.exports = router;