const express = require('express');
const router = express.Router();

const sharedController = require('../controllers/SharedController.js');

router.get('/users/:id/shared', sharedController.findAllShared)
router.get('/shared/:id', sharedController.findShared);
router.get('/shared/:id/collaborators', sharedController.findCollaborators);
router.post('/users/:id/shared', sharedController.createShared);
router.put('/shared/:id', sharedController.updateShared);
router.delete('/shared/:id', sharedController.deleteShared);

module.exports = router