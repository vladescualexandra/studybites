const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController.js');

router.get('/users/:id', usersController.findUser);
router.post('/users', usersController.createUser);

module.exports = router