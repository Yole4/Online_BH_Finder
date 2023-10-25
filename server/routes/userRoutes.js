const express = require('express');
const {registerUser} = require('../controllers/userController');
const {loginUser} = require('../controllers/userController');
const {findUserId} = require('../controllers/userController');
const {getUsers} = require('../controllers/userController');

const router = express.Router();
const {verifyToken} = require('../utils/auth/AuthVerify');

router.post('/register', verifyToken, registerUser);
router.post('/login', verifyToken, loginUser);
router.get('/find/:userId', verifyToken, findUserId);
router.get('/', getUsers);
// router.get('/', getUsers);

module.exports = router;