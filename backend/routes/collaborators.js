const express = require('express');
const router = express.Router();

const collaborators = require('../controllers/CollaboratorsController.js');

router.get('/shared/:id/collaborators', collaborators.findAllCollaborators)
router.get('/collaborators/:id', collaborators.findCollaborators);
router.post('/users/:id/collaborators', collaborators.createCollaborator);
router.put('/collaborators/:id', collaborators.updateCollaborator);
router.delete('/collaborators/:id', collaborators.deleteCollaborator);

module.exports = router