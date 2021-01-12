const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController.js');

router.get('/users/:id', usersController.findUser);
router.get('/users/collab/:email', usersController.findUserByEmail);
router.get('/user/:email/:password', usersController.validateUser);
router.post('/users', usersController.createUser);

module.exports = router