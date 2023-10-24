const express = require('express');
const {registerUser} = require('../controllers/userController');
const {loginUser} = require('../controllers/userController');
const {findUserId} = require('../controllers/userController');
const {getUsers} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:userId', findUserId);
router.get('/', getUsers);
// router.get('/', getUsers);

module.exports = router;